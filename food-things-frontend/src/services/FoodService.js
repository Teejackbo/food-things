import ApiService from './ApiService'

class FoodService {
  static async create(data) {
    return ApiService.Post('/food/create', {
      data,
      auth: true,
      showValidationErrors: true,
    })
  }
}

export default FoodService
