import { shallowMount } from '@vue/test-utils'
import PrimaryButton from '@/components/PrimaryButton.vue'

describe('<PrimaryButton />', () => {
  it('Should match snapshot.', () => {
    const wrapper = shallowMount(PrimaryButton)

    expect(wrapper.element).toMatchSnapshot()
  })

  it('Should render a button element with the class of the type prop.', () => {
    const wrapper = shallowMount(PrimaryButton, {
      propsData: {
        type: 'error',
      },
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
