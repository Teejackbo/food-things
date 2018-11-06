import Vue from 'vue'
import Vuex from 'vuex'

import user from '@/store/modules/user'
import alerts from '@/store/modules/alerts'
import food from '@/store/modules/food'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    alerts,
    food,
  },
  state: {},
  mutations: {},
  actions: {},
})
