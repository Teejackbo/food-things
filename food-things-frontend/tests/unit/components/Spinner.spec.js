import { shallowMount } from '@vue/test-utils'
import Spinner from '@/components/Spinner.vue'

describe('<Spinner />', () => {
  it('Should render a div with a class of spinner.', () => {
    const wrapper = shallowMount(Spinner)

    expect(wrapper.contains('div')).toBe(true)
    expect(wrapper.classes()).toContain('spinner')
    expect(wrapper.element).toMatchSnapshot()
  })

  it('Should render a div with a class of wrapper if passed :fullScreen="true".', () => {
    const wrapper = shallowMount(Spinner, {
      propsData: {
        fullScreen: true,
      },
    })

    expect(wrapper.contains('div')).toBe(true)
    expect(wrapper.classes()).toContain('wrapper')
    expect(wrapper.classes()).not.toContain('spinner')
    expect(wrapper.element).toMatchSnapshot()
  })

  it('Should render a div with a class of spinner inside the wrapper.', () => {
    const wrapper = shallowMount(Spinner, {
      propsData: {
        fullScreen: true,
      },
    })

    const spinner = wrapper.find('.spinner')
    expect(spinner).toBeDefined()
    expect(spinner.is('div')).toBe(true)
    expect(wrapper.element).toMatchSnapshot()
  })
})
