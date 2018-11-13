import { shallowMount } from '@vue/test-utils'
import Alert from '@/components/Alert.vue'
import $store from '@/store'

describe('<Alert />', () => {
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
})
