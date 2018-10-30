import { shallowMount } from '@vue/test-utils'
import SignUp from '@/components/SignUp'
import registerGlobals from './global/'

registerGlobals()

describe('SignUp', () => {
  it('Should render a div.', () => {
    const wrapper = shallowMount(SignUp)
    expect(wrapper.is('div')).toBe(true)
  })

  it('Should render a fullscreen spinner if the component is submitting.', () => {
    const wrapper = shallowMount(SignUp, {
      data() {
        return {
          submitting: true,
        }
      },
    })
    expect(wrapper.attributes()).toEqual({ fullscreen: 'true' })
  })

  it('Should render 5 inputs.', () => {
    const wrapper = shallowMount(SignUp)
    expect(wrapper.find('[name="first_name"]').exists()).toBe(true)
    expect(wrapper.find('[name="last_name"]').exists()).toBe(true)
    expect(wrapper.find('[name="email"]').exists()).toBe(true)
    expect(wrapper.find('[name="username"]').exists()).toBe(true)
    expect(wrapper.find('[name="password"]').exists()).toBe(true)
  })

  it('Should render a button with the type of success.', () => {
    const wrapper = shallowMount(SignUp)
    expect(wrapper.find('[type="success"]').exists()).toBe(true)
  })
})
