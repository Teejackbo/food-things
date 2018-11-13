import store from 'store'
import actions from '@/store/modules/user/actions'
import TYPES from '@/store/modules/user/types'
import UserService from '@/services/UserService'
import { ADD_ALERT_ACTION } from '@/store/modules/alerts/types'

describe('User Actions', () => {
  let data
  let commit
  let dispatch
  let user

  beforeEach(() => {
    commit = jest.fn()
    dispatch = jest.fn()
    user = {
      id: 1,
      first_name: 'Jack',
      last_name: 'Coldrick',
      email: 'jcldrk@gmail.com',
      username: 'jack',
      token: 'dc8e88553b729d255a30',
      permissions: 1,
      createdAt: '2018-07-17T11:56:34.360Z',
      updatedAt: '2018-11-09T22:35:31.000Z',
    }

    store.set = jest.fn()
    store.get = jest.fn()
    store.remove = jest.fn()
    UserService.login = jest
      .fn()
      .mockImplementation(async () => ({ data: user }))

    UserService.logout = jest.fn().mockImplementation(async () => 'ok')
    UserService.register = jest
      .fn()
      .mockImplementation(async () => ({ data: user }))

    data = { loginInfo: user, alert: false, remember: false }
  })

  describe('LOGIN_ACTION', () => {
    it('Should call the UserService.', async () => {
      await actions[TYPES.LOGIN_ACTION]({ commit, dispatch }, data)

      expect(UserService.login).toHaveBeenCalledWith(user)
    })

    it('If remember is true, should store the user in localStorage.', async () => {
      data.remember = true
      await actions[TYPES.LOGIN_ACTION]({ commit, dispatch }, data)

      expect(store.set).toHaveBeenCalledWith('user', user)
    })

    it('If remember is false, should not set the user in localStorage.', async () => {
      await actions[TYPES.LOGIN_ACTION]({ commit, dispatch }, data)

      expect(store.set).not.toHaveBeenCalled()
    })

    it('If alert is true, should dispatch an action to add an alert.', async () => {
      data.alert = true
      await actions[TYPES.LOGIN_ACTION]({ commit, dispatch }, data)

      expect(dispatch).toHaveBeenCalledWith(ADD_ALERT_ACTION, {
        message: 'Successfully logged in.',
        type: 'success',
        timeout: 3000,
      })
    })

    it('If alert is false, should not dispatch an action to add an alert.', async () => {
      await actions[TYPES.LOGIN_ACTION]({ commit, dispatch }, data)

      expect(dispatch).not.toHaveBeenCalled()
    })

    it('Should commit the correct mutation.', async () => {
      await actions[TYPES.LOGIN_ACTION]({ commit, dispatch }, data)

      expect(commit).toHaveBeenCalledWith(TYPES.STORE_USER_MUTATION, user)
    })

    it('Should not commit a mutation if there is no response.', async () => {
      UserService.login = jest.fn().mockImplementation(async () => null)
      await actions[TYPES.LOGIN_ACTION]({ commit, dispatch }, data)

      expect(commit).not.toHaveBeenCalled()
    })
  })

  describe('STORE_USER_ACTION', () => {
    it('Should commit the correct mutation.', () => {
      actions[TYPES.STORE_USER_ACTION]({ commit }, user)

      expect(commit).toHaveBeenCalledWith(TYPES.STORE_USER_MUTATION, user)
    })
  })

  describe('FETCH_FROM_STORAGE_ACTION', () => {
    it('Should fetch the user from localStorage.', () => {
      actions[TYPES.FETCH_FROM_STORAGE_ACTION]({ commit })

      expect(store.get).toHaveBeenCalledWith('user')
    })

    it('Should commit the correct mutation if the user is retrieved.', () => {
      store.get = jest.fn().mockImplementation(() => user)
      actions[TYPES.FETCH_FROM_STORAGE_ACTION]({ commit })

      expect(commit).toHaveBeenCalledWith(TYPES.STORE_USER_MUTATION, user)
    })

    it('Should not commit a mutation if the user is not found.', () => {
      store.get = jest.fn().mockImplementation(() => null)
      actions[TYPES.FETCH_FROM_STORAGE_ACTION]({ commit })

      expect(commit).not.toHaveBeenCalled()
    })
  })

  describe('LOGOUT_ACTION', () => {
    it('Should call the UserService.', async () => {
      await actions[TYPES.LOGOUT_ACTION]({ commit, dispatch })

      expect(UserService.logout).toHaveBeenCalled()
    })

    it('Should remove the user from localStorage.', async () => {
      await actions[TYPES.LOGOUT_ACTION]({ commit, dispatch })

      expect(store.remove).toHaveBeenCalledWith('user')
    })

    it('Should dispatch an alert.', async () => {
      await actions[TYPES.LOGOUT_ACTION]({ commit, dispatch })

      expect(dispatch).toHaveBeenCalledWith(ADD_ALERT_ACTION, {
        type: 'success',
        message: 'Successfully signed out.',
        timeout: 3000,
      })
    })

    it('Should commit the correct mutation.', async () => {
      await actions[TYPES.LOGOUT_ACTION]({ commit, dispatch })

      expect(commit).toHaveBeenCalledWith(TYPES.DELETE_USER_MUTATION)
    })

    it('Should not remove the user from localStorage if there is no response.', async () => {
      UserService.logout = jest.fn().mockImplementation(async () => null)
      await actions[TYPES.LOGOUT_ACTION]({ commit, dispatch })

      expect(store.remove).not.toHaveBeenCalled()
    })

    it('Should not dispatch an alert if there is no response.', async () => {
      UserService.logout = jest.fn().mockImplementation(async () => null)
      await actions[TYPES.LOGOUT_ACTION]({ commit, dispatch })

      expect(dispatch).not.toHaveBeenCalled()
    })

    it('Should not commit a mutation if there is no response.', async () => {
      UserService.logout = jest.fn().mockImplementation(async () => null)
      await actions[TYPES.LOGOUT_ACTION]({ commit, dispatch })

      expect(commit).not.toHaveBeenCalled()
    })
  })

  describe('REGISTER_USER_ACTION', () => {
    it('Should call the UserService.', async () => {
      await actions[TYPES.REGISTER_USER_ACTION]({ commit, dispatch }, user)

      expect(UserService.register).toHaveBeenCalledWith(user)
    })

    it('Should dispatch an alert.', async () => {
      await actions[TYPES.REGISTER_USER_ACTION]({ commit, dispatch }, user)

      expect(dispatch).toHaveBeenCalledWith(ADD_ALERT_ACTION, {
        message: `Successfully registered. Welcome, ${user.username}!`,
        type: 'success',
        timeout: 3000,
      })
    })

    it('Should commit the correct mutation.', async () => {
      await actions[TYPES.REGISTER_USER_ACTION]({ commit, dispatch }, user)

      expect(commit).toHaveBeenCalledWith(TYPES.STORE_USER_MUTATION, user)
    })

    it('Should not dispatch an alert if there is no response.', async () => {
      UserService.register = jest.fn().mockImplementation(() => null)
      await actions[TYPES.REGISTER_USER_ACTION]({ commit, dispatch }, user)

      expect(dispatch).not.toHaveBeenCalled()
    })

    it('Should not commit a mutation if there is no response.', async () => {
      UserService.register = jest.fn().mockImplementation(() => null)
      await actions[TYPES.REGISTER_USER_ACTION]({ commit, dispatch }, user)

      expect(commit).not.toHaveBeenCalled()
    })
  })
})
