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
      mocks: {
        $store,
      },
    })
  }

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
