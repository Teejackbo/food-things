import { shallowMount } from '@vue/test-utils'
import InputField from '@/components/InputField.vue'

function getWrapper(label, inputWidth, display) {
  return shallowMount(InputField, {
    propsData: {
      label,
      inputWidth,
      display,
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

  it('Should apply props correctly.', () => {
    const wrapper = getWrapper('Label', '5em', 'inline-block')

    expect(wrapper.element).toMatchSnapshot()
  })

  it('Should emit an input event when typed in.', () => {
    const wrapper = getWrapper()
    const input = wrapper.find('input')
    input.setValue('test')

    expect(wrapper.emitted()).toEqual({ input: [['test']] })
  })
})
