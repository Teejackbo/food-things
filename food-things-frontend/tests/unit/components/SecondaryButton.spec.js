import { shallowMount } from '@vue/test-utils'
import SecondaryButton from '@/components/SecondaryButton.vue'

describe('<SecondaryButton />', () => {
  it('Should match snapshot.', () => {
    const wrapper = shallowMount(SecondaryButton)

    expect(wrapper.element).toMatchSnapshot()
  })

  it('Should render a button element with the class of the type prop.', () => {
    const wrapper = shallowMount(SecondaryButton, {
      propsData: {
        type: 'error',
      },
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
