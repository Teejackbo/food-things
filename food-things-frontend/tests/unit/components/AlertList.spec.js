import { mount } from '@vue/test-utils'
import AlertList from '@/components/AlertList.vue'

describe('<AlertList />', () => {
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
})
