import TYPES from './types'

export default {
  [TYPES.ADD_ALERT_ACTION]({ commit }, alert) {
    commit(TYPES.ADD_ALERT_MUTATION, alert)
  },

  [TYPES.ADD_MULTIPLE_ALERTS_ACTION]({ commit }, alerts) {
    commit(TYPES.ADD_MULTIPLE_ALERTS_MUTATION, alerts)
  },

  [TYPES.REMOVE_ALERT_ACTION]({ commit }, alert) {
    commit(TYPES.REMOVE_ALERT_MUTATION, alert)
  },
}
