import ApiService from './ApiService'

class UserService {
  static async login(details) {
    return ApiService.Post('/users/login', {
      data: details,
      showValidationErrors: true,
    })
  }

  static async logout() {
    return ApiService.Get('/users/logout', {
      auth: true,
      showValidationErrors: true,
    })
  }

  static async register(details) {
    return ApiService.Post('/users/register', {
      data: details,
      showValidationErrors: true,
    })
  }
}

export default UserService
