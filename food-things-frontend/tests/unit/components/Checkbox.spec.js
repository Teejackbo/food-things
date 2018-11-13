import { shallowMount } from '@vue/test-utils'
import Checkbox from '@/components/Checkbox.vue'

describe('<Checkbox />', () => {
  it('Should match snapshot when value is false.', () => {
    const wrapper = shallowMount(Checkbox, {
      propsData: {
        value: false,
      },
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('Should match snapshot when value is true.', () => {
    const wrapper = shallowMount(Checkbox, {
      propsData: {
        value: true,
      },
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('Should emit an event if it is clicked or space is used to toggle it.', () => {
    const wrapper = shallowMount(Checkbox)

    wrapper.trigger('click')
    expect(wrapper.emitted()).toEqual({ input: [[true]] })

    wrapper.trigger('keyup.space')
    expect(wrapper.emitted()).toEqual({ input: [[true], [false]] })
  })

  it('Clicking or pressing space should toggle the checked class.', () => {
    const wrapper = shallowMount(Checkbox)

    wrapper.trigger('click')
    expect(wrapper.contains('div.checkbox.checked')).toBe(true)

    wrapper.trigger('keyup.space')
    expect(wrapper.contains('div.checkbox.checked')).toBe(false)
  })
})
