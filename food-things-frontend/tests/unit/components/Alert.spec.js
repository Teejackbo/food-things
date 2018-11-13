import { shallowMount } from '@vue/test-utils'
import Alert from '@/components/Alert.vue'
import $store from '@/store'

describe('Alert', () => {
  function getWrapper() {
    return shallowMount(Alert, {
      propsData: {
        alert: {
          type: 'success',
          timeout: 3000,
          message: 'This is an alert.',
        },
      },
      mocks: { $store },
    })
  }

  it('Should match snapshot with no class.', () => {
    const wrapper = shallowMount(Alert, {
      propsData: {
        alert: {
          message: 'This is an alert',
          timeout: 3000,
        },
      },
      mocks: { $store },
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('Should match snapshot with a type of success.', () => {
    const wrapper = getWrapper()

    expect(wrapper.element).toMatchSnapshot()
  })

  it('Should match snapshot with a type of warning.', () => {
    const wrapper = shallowMount(Alert, {
      propsData: {
        alert: {
          message: 'This is an alert',
          timeout: 3000,
          type: 'warning',
        },
      },
      mocks: { $store },
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('Should match snapshot with a type of error.', () => {
    const wrapper = shallowMount(Alert, {
      propsData: {
        alert: {
          message: 'This is an alert',
          timeout: 3000,
          type: 'error',
        },
      },
      mocks: { $store },
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('Renders a div.', () => {
    const wrapper = getWrapper()
    expect(wrapper.contains('div')).toBe(true)
  })

  it('Displays the alert message.', () => {
    const wrapper = getWrapper()
    expect(wrapper.text()).toBe('This is an alert.')
  })

  it('Applies the correct class.', () => {
    const wrapper = getWrapper()
    expect(wrapper.classes()).toContain('success')
  })
})
