import TYPES from './types'

export default {
  [TYPES.STORE_USER_MUTATION](state, data) {
    state.user = data
  },

  [TYPES.DELETE_USER_MUTATION](state) {
    state.user = {}
  },
}
