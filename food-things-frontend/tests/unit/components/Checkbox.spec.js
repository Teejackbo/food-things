import { shallowMount } from '@vue/test-utils'
import Checkbox from '@/components/Checkbox.vue'

describe('<Checkbox />', () => {
  it('Should match snapshot.', () => {
    const wrapper = shallowMount(Checkbox)

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

  it('Should render a div with the class of checkbox.', () => {
    const wrapper = shallowMount(Checkbox)

    expect(wrapper.contains('div.checkbox')).toBe(true)
  })

  it('Should add the class checked if a true value prop is passed.', () => {
    const wrapper = shallowMount(Checkbox, {
      propsData: {
        value: true,
      },
    })

    expect(wrapper.contains('div.checkbox.checked')).toBe(true)
  })

  it('Should not have the class checked if a false value prop is passed.', () => {
    const wrapper = shallowMount(Checkbox, {
      propsData: {
        value: false,
      },
    })

    expect(wrapper.contains('div.checkbox.checked')).toBe(false)
  })

  it('Should render a tick if it is checked, or nothing if not.', () => {
    const wrapper = shallowMount(Checkbox, {
      propsData: {
        value: true,
      },
    })

    expect(wrapper.text()).toBe('✓')
    wrapper.setData({ checked: false })
    expect(wrapper.text()).toBe('')
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
