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

  it('Should render a div with the class of form field.', () => {
    const wrapper = getWrapper()

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('form-field')
  })

  it('Should not render a label when no label prop is passed.', () => {
    const wrapper = getWrapper()

    expect(wrapper.find('label').exists()).toBe(false)
  })

  it('Should render a label with the label prop as text.', () => {
    const text = 'Test Label'
    const wrapper = getWrapper(text)
    const label = wrapper.find('label')

    expect(label.exists()).toBe(true)
    expect(label.text()).toBe(text)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('Should not apply a style tag without an inputWidth prop.', () => {
    const wrapper = getWrapper()
    const input = wrapper.find('input')

    expect(input.attributes().style).toBe(undefined)
  })

  it('Should apply the inputWidth prop to the input.', () => {
    const wrapper = getWrapper('Label', '5em')
    const input = wrapper.find('input')

    expect(input.attributes().style).toBe('width: 5em;')
    expect(wrapper.element).toMatchSnapshot()
  })

  it('Should not apply a class without a display prop.', () => {
    const wrapper = getWrapper()

    expect(wrapper.classes()).not.toContain('inline-block')
  })

  it('Should apply the correct class if display prop is inline-block.', () => {
    const wrapper = getWrapper('Label', '5em', 'inline-block')

    expect(wrapper.classes()).toContain('inline-block')
    expect(wrapper.element).toMatchSnapshot()
  })

  it('Should emit an input event when typed in.', () => {
    const wrapper = getWrapper()
    const input = wrapper.find('input')
    input.setValue('test')

    expect(wrapper.emitted()).toEqual({ input: [['test']] })
  })

  it('Should apply attributes to the input element.', () => {
    const wrapper = getWrapper()
    const input = wrapper.find('input')

    expect(input.attributes()).toEqual({
      placeholder: 'placeholder',
      type: 'text',
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
