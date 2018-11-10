import mutations from '@/store/modules/food/mutations'
import TYPES from '@/store/modules/food/types'

describe('Food Mutations', () => {
  let state = {
    selectedFood: null,
  }

  const food = {
    id: 2,
    name: 'bread',
    description: 'you know what bread is',
    calories: 100,
    fat: 10,
    protein: 2,
    carbs: 60,
  }

  describe('Create Food', () => {
    it('Should store the food in state.', () => {
      mutations[TYPES.CREATE_FOOD_MUTATION](state, food)
      expect(state.selectedFood).toBe(food)
    })
  })
})
