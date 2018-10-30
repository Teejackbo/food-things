import Vue from 'vue'
import Vuex from 'vuex'

import user from '@/store/modules/user'
import alerts from '@/store/modules/alerts'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    alerts,
  },
  state: {},
  mutations: {},
  actions: {},
})
