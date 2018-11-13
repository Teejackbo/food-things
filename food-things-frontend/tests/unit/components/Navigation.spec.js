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

describe('<Navigation />', () => {
  it('Should match snapshot.', () => {
    const wrapper = getWrapper()

    expect(wrapper.element).toMatchSnapshot()
  })
})
