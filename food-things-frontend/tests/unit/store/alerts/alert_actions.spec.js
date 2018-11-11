import generateAlert from './generateAlert'
import TYPES from '@/store/modules/alerts/types'
import actions from '@/store/modules/alerts/actions'

const commit = jest.fn()

describe('Alert Actions', () => {
  describe(TYPES.ADD_ALERT_ACTION, () => {
    it('Should commit the correct mutation with an alert.', () => {
      const alert = generateAlert()
      actions[TYPES.ADD_ALERT_ACTION]({ commit }, alert)

      expect(commit).toBeCalledWith(TYPES.ADD_ALERT_MUTATION, alert)
    })
  })

  describe(TYPES.ADD_MULTIPLE_ALERTS_ACTION, () => {
    it('Should commit the correct mutation with multiple alerts.', () => {
      const alerts = [generateAlert(), generateAlert()]
      actions[TYPES.ADD_MULTIPLE_ALERTS_ACTION]({ commit }, alerts)

      expect(commit).toBeCalledWith(TYPES.ADD_MULTIPLE_ALERTS_MUTATION, alerts)
    })
  })

  describe(TYPES.REMOVE_ALERT_ACTION, () => {
    it('Should commit the correct mutation with an alert.', () => {
      const alert = generateAlert()
      actions[TYPES.REMOVE_ALERT_ACTION]({ commit }, alert)

      expect(commit).toBeCalledWith(TYPES.REMOVE_ALERT_MUTATION, alert)
    })
  })
})
