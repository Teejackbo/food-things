import { shallowMount } from '@vue/test-utils'
import SignUp from '@/views/SignUp'
import registerGlobals from '../components/global/'

registerGlobals()

describe('SignUp', () => {
  it('Should match snapshot.', () => {
    const wrapper = shallowMount(SignUp)

    expect(wrapper.element).toMatchSnapshot()
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
    expect(wrapper.element).toMatchSnapshot()
  })
})
