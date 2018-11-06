import TYPES from './types'

export default {
  [TYPES.CREATE_FOOD_MUTATION](state, food) {
    state.selectedFood = food
  },
}
