import { shallowMount } from '@vue/test-utils'
import SecondaryButton from '@/components/SecondaryButton.vue'

describe('SecondaryButton', () => {
  it('Should render a button element.', () => {
    const wrapper = shallowMount(SecondaryButton)
    expect(wrapper.contains('button')).toBe(true)
  })

  it('Should render a button element with the class of the type prop.', () => {
    const wrapper = shallowMount(SecondaryButton, {
      propsData: {
        type: 'error',
      },
    })

    expect(wrapper.classes()).toContain('error')
  })
})
