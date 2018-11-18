import { shallowMount } from '@vue/test-utils'
import InputField from '@/components/InputField.vue'

function getWrapper(error, valid) {
  return shallowMount(InputField, {
    propsData: {
      error,
      valid,
    },
    attrs: {
      placeholder: 'placeholder',
      type: 'text',
    },
  })
}

describe('<InputField />', () => {
  it('Should match snapshot.', () => {
    const wrapper = getWrapper()

    expect(wrapper.element).toMatchSnapshot()
  })

  it('Should apply error class correctly.', () => {
    const wrapper = getWrapper(true, false)

    expect(wrapper.element).toMatchSnapshot()
  })

  it('Should apply valid class correctly.', () => {
    const wrapper = getWrapper(false, true)

    expect(wrapper.element).toMatchSnapshot()
  })

  it('Should emit an input event when typed in.', () => {
    const wrapper = getWrapper()
    const input = wrapper.find('input')
    input.setValue('test')

    expect(wrapper.emitted()).toEqual({ input: [['test']] })
  })
})
