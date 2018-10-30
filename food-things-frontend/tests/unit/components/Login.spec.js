import { shallowMount } from '@vue/test-utils'
import Login from '@/components/Login'
import registerGlobals from './global/'

registerGlobals()

describe('Login', () => {
  it('Should render a div with no classes.', () => {
    const wrapper = shallowMount(Login)
    expect(wrapper.is('div')).toBe(true)
  })

  it('Should render three inputs of correct types.', () => {
    const wrapper = shallowMount(Login)

    expect(wrapper.find('[type="text"]').exists()).toBe(true)
    expect(wrapper.find('[type="password"]').exists()).toBe(true)
    expect(wrapper.find('[type="checkbox"]').exists()).toBe(true)
  })

  it('Should render a button with the type of success.', () => {
    const wrapper = shallowMount(Login)
    expect(wrapper.find('[type="success"]').exists()).toBe(true)
  })

  it('Should display a fullscreen spinner if it is submitting.', () => {
    const wrapper = shallowMount(Login, {
      data() {
        return {
          submitting: true,
        }
      },
    })
    expect(wrapper.attributes()).toEqual({ fullscreen: 'true' })
  })
})
