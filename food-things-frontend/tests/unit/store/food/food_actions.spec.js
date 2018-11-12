import actions from '@/store/modules/food/actions'
import TYPES from '@/store/modules/food/types'
import FoodService from '@/services/FoodService'
import { ADD_ALERT_ACTION } from '@/store/modules/alerts/types'

const commit = jest.fn()
const dispatch = jest.fn()
const food = {
  id: 1,
  name: 'bread',
  description: 'bread is bread',
  calories: 100,
  carbs: 50,
  protein: 10,
  fat: 20,
}

describe('Food Actions', () => {
  describe('CREATE_FOOD_ACTION', () => {
    FoodService.create = jest
      .fn()
      .mockImplementation(async () => ({ data: food }))

    it('Should dispatch an action to add an alert.', async () => {
      await actions[TYPES.CREATE_FOOD_ACTION]({ commit, dispatch }, food)

      expect(dispatch).toBeCalledWith(ADD_ALERT_ACTION, {
        message: 'bread successfully created!',
        type: 'success',
        timeout: 3000,
      })
    })

    it('Should commit the correct mutation.', async () => {
      await actions[TYPES.CREATE_FOOD_ACTION]({ commit, dispatch }, food)

      expect(commit).toBeCalledWith(TYPES.CREATE_FOOD_MUTATION, food)
    })

    it('Should call the FoodService.', async () => {
      await actions[TYPES.CREATE_FOOD_ACTION]({ commit, dispatch }, food)

      expect(FoodService.create).toHaveBeenCalledWith(food)
    })
  })
})
