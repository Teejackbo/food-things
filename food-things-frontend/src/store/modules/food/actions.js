import TYPES from './types'
import { ADD_ALERT_ACTION } from '../alerts/types'
import FoodService from '@/services/FoodService'

export default {
  async [TYPES.CREATE_FOOD_ACTION]({ commit, dispatch }, data) {
    const response = await FoodService.create(data)

    if (response) {
      dispatch(ADD_ALERT_ACTION, {
        message: `${response.data.name} successfully created!`,
        type: 'success',
        timeout: 3000,
      })

      commit(TYPES.CREATE_FOOD_MUTATION, response.data)
    }
  },
}
