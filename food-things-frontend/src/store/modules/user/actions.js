import store from 'store'
import TYPES from './types'
import { ADD_ALERT_ACTION } from '../alerts/types'
import userRequests from '@/api/users'

export default {
  async [TYPES.LOGIN_ACTION]({ commit, dispatch }, data) {
    const { loginInfo, alert, remember } = data
    const response = await userRequests.login(loginInfo)

    if (response) {
      const user = response.data

      if (remember) store.set('user', user)

      if (alert) {
        dispatch(ADD_ALERT_ACTION, {
          message: 'Successfully logged in.',
          type: 'success',
          timeout: 3000,
        })
      }

      commit(TYPES.STORE_USER_MUTATION, user)
    }
  },

  [TYPES.STORE_USER_ACTION]({ commit }, user) {
    commit(TYPES.STORE_USER_MUTATION, user)
  },

  [TYPES.FETCH_FROM_STORAGE_ACTION]({ commit }) {
    const user = store.get('user')
    if (user) commit(TYPES.STORE_USER_MUTATION, user)
  },

  async [TYPES.LOGOUT_ACTION]({ commit, dispatch }) {
    const response = await userRequests.logout()
    if (response) {
      store.remove('user')
      dispatch(ADD_ALERT_ACTION, {
        type: 'success',
        message: 'Successfully signed out.',
        timeout: 3000,
      })
    }
    commit(TYPES.DELETE_USER_MUTATION)
  },

  async [TYPES.REGISTER_USER_ACTION]({ commit, dispatch }, registrationInfo) {
    const response = await userRequests.register(registrationInfo)

    if (response) {
      const user = response.data

      dispatch(ADD_ALERT_ACTION, {
        message: `Successfully registered. Welcome, ${user.username}!`,
        type: 'success',
        timeout: 3000,
      })

      commit(TYPES.STORE_USER_MUTATION, user)
    }
  },
}
