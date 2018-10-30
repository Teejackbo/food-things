import mutations from '@/store/modules/alerts/mutations'
import TYPES from '@/store/modules/alerts/types'
import generateAlert from './generateAlert'

describe('AlertMutations', () => {
  let state
  let initialAlert

  beforeEach(() => {
    initialAlert = generateAlert()

    state = {
      alerts: [initialAlert],
    }
  })

  describe('Add Alert', () => {
    it('Should push the new alert to state.', () => {
      const alert = generateAlert()
      mutations[TYPES.ADD_ALERT_MUTATION](state, alert)
      expect(state.alerts).toHaveLength(2)
      expect(state.alerts[1]).toBe(alert)
      expect(state.alerts[0]).toBe(initialAlert)
    })
  })

  describe('Add Multiple Alerts', () => {
    it('Should add the new alerts to state.', () => {
      const alerts = [generateAlert(), generateAlert()]
      mutations[TYPES.ADD_MULTIPLE_ALERTS_MUTATION](state, alerts)
      expect(state.alerts).toHaveLength(3)
      expect(state.alerts[0]).toBe(initialAlert)
      expect(state.alerts[1]).toBe(alerts[0])
      expect(state.alerts[2]).toBe(alerts[1])
    })
  })

  describe('Remove Alert', () => {
    it('Should remove the alert from state.', () => {
      mutations[TYPES.REMOVE_ALERT_MUTATION](state, initialAlert)
      expect(state.alerts).toHaveLength(0)
    })

    it('Should remove the correct alert from state.', () => {
      const alerts = [generateAlert(), generateAlert()]
      state.alerts = [...state.alerts, ...alerts]
      mutations[TYPES.REMOVE_ALERT_MUTATION](state, alerts[0])
      expect(state.alerts).toHaveLength(2)
      expect(state.alerts[0]).toBe(initialAlert)
      expect(state.alerts[1]).toBe(alerts[1])
    })
  })
})
