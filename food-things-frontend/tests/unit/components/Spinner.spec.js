import { shallowMount } from '@vue/test-utils'
import Spinner from '@/components/Spinner.vue'

describe('<Spinner />', () => {
  it('Should match snapshot.', () => {
    const wrapper = shallowMount(Spinner)

    expect(wrapper.element).toMatchSnapshot()
  })

  it('Should render a div with a class of wrapper if passed :fullScreen="true".', () => {
    const wrapper = shallowMount(Spinner, {
      propsData: {
        fullScreen: true,
      },
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
