import { get, post } from '../index'

export async function login(loginInfo) {
  return post('/users/login', {
    data: loginInfo,
    showValidationErrors: true,
  })
}

export async function logout() {
  return get('/users/logout', {
    auth: true,
    showValidationErrors: true,
  })
}

export async function register(registrationInfo) {
  return post('/users/register', {
    data: registrationInfo,
    showValidationErrors: true,
  })
}

export default {
  login,
  logout,
  register,
}
