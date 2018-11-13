import { shallowMount } from '@vue/test-utils'
import Login from '@/views/Login'
import registerGlobals from '../components/global'
import $store from '@/store'

registerGlobals()

describe('<Login />', () => {
  it('Should match snapshot.', () => {
    const wrapper = shallowMount(Login, { mocks: { $store } })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('Should display a fullscreen spinner if it is submitting.', () => {
    const wrapper = shallowMount(Login, {
      data() {
        return {
          submitting: true,
        }
      },
      mocks: {
        $store,
      },
    })

    expect(wrapper.attributes()).toEqual({ fullscreen: 'true' })
    expect(wrapper.element).toMatchSnapshot()
  })
})
