import { mount } from '@vue/test-utils'
import AlertList from '@/components/AlertList.vue'

describe('AlertList', () => {
  const alerts = [
    {
      message: 'Alert 1.',
      type: 'success',
      timeout: 3000,
    },
    {
      message: 'Alert 2.',
      type: 'warning',
      timeout: 3000,
    },
  ]

  function getWrapper() {
    return mount(AlertList, {
      mocks: {
        $store: {
          state: {
            alerts: {
              alerts,
            },
          },
        },
      },
    })
  }

  it('Should match snapshot.', () => {
    const wrapper = getWrapper()

    expect(wrapper.element).toMatchSnapshot()
  })

  it('Should render a transition group with the correct attributes.', () => {
    const wrapper = getWrapper()

    expect(wrapper.attributes().name).toBe('slide-fade')
    expect(wrapper.attributes().tag).toBe('section')
  })

  it('Should render the alerts from the store correctly.', () => {
    const wrapper = getWrapper()
    const children = wrapper.findAll('div')

    expect(children).toHaveLength(2)
    expect(children.at(0).classes()).toContain('success')
    expect(children.at(0).text()).toBe('Alert 1.')
    expect(children.at(1).classes()).toContain('warning')
    expect(children.at(1).text()).toBe('Alert 2.')
  })
})
