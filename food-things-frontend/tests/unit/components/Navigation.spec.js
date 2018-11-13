import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Navigation from '@/components/Navigation'
import $store from '@/store'

Vue.use(VueRouter)

function getWrapper() {
  return shallowMount(Navigation, {
    mocks: {
      $store,
    },
  })
}

describe('Navigation', () => {
  it('Renders a nav element.', () => {
    const wrapper = getWrapper()

    expect(wrapper.contains('nav')).toBe(true)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('Should contain two sections.', () => {
    const wrapper = getWrapper()

    expect(wrapper.findAll('section')).toHaveLength(2)
  })
})
