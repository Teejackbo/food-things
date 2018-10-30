import TYPES from './types'

export default {
  [TYPES.ADD_ALERT_MUTATION](state, alert) {
    state.alerts.push(alert)
  },

  [TYPES.ADD_MULTIPLE_ALERTS_MUTATION](state, alerts) {
    state.alerts = [...state.alerts, ...alerts]
  },

  [TYPES.REMOVE_ALERT_MUTATION](state, alert) {
    const index = state.alerts.indexOf(alert)
    state.alerts.splice(index, 1)
  },
}
