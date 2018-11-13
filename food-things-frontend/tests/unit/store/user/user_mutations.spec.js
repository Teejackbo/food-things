import mutations from '@/store/modules/user/mutations'
import TYPES from '@/store/modules/user/types'

describe('User Mutations', () => {
  let state
  let user

  beforeEach(() => {
    state = {
      user: null,
    }

    user = {
      id: 1,
      first_name: 'Jack',
      last_name: 'Coldrick',
      username: 'jack',
      email: 'jack@foodthings.com',
    }
  })

  describe('STORE_USER_MUTATION', () => {
    it('Should set the user in state.', () => {
      mutations[TYPES.STORE_USER_MUTATION](state, user)

      expect(state.user).toBe(user)
    })
  })

  describe('DELETE_USER_MUTATION', () => {
    it('Should remove the user from state.', () => {
      state.user = user
      mutations[TYPES.DELETE_USER_MUTATION](state)

      expect(state.user).toEqual({})
    })
  })
})
