import { shallowMount } from '@vue/test-utils'
import PrimaryButton from '@/components/PrimaryButton.vue'

describe('PrimaryButton', () => {
  it('Should render a button element.', () => {
    const wrapper = shallowMount(PrimaryButton)
    expect(wrapper.contains('button')).toBe(true)
  })

  it('Should render a button element with the class of the type prop.', () => {
    const wrapper = shallowMount(PrimaryButton, {
      propsData: {
        type: 'error',
      },
    })

    expect(wrapper.classes()).toContain('error')
  })
})
