import axios from 'axios'
import store from '@/store'
import {
  ADD_MULTIPLE_ALERTS_ACTION,
  ADD_ALERT_ACTION,
} from '@/store/modules/alerts/types'
import has from 'lodash/has'

const BASE_URL = '//localhost:3000/api'

class ApiService {
  static async _baseRequest(url, data, options) {
    const TOKEN = store.state.user.user.token
    let axiosInstance

    if (options.auth) {
      axiosInstance = axios.create({
        baseURL: BASE_URL,
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
    } else {
      axiosInstance = axios.create({
        baseURL: BASE_URL,
      })
    }

    if (data) {
      return axiosInstance[options.type](url, data)
    }

    return axiosInstance[options.type](url)
  }

  static _sendErrorsToStore(errors) {
    const messages = []
    let timeout = 3000

    if (typeof errors === 'string') {
      store.dispatch(ADD_ALERT_ACTION, {
        message: errors,
        type: 'error',
        timeout: 3000,
      })
      return
    }

    errors.forEach(({ constraints: errors }) => {
      for (let error in errors) {
        messages.push({
          message: errors[error],
          type: 'error',
          timeout,
        })
        timeout += 1000
      }
    })
    store.dispatch(ADD_MULTIPLE_ALERTS_ACTION, messages)
  }

  static async Post(url, options) {
    try {
      const response = await this._baseRequest(url, options.data, {
        type: 'post',
        auth: options.auth,
      })

      return response
    } catch (e) {
      if (options.showValidationErrors && has(e, 'response.data.message')) {
        this._sendErrorsToStore(e.response.data.message)
      }
    }
  }

  static async Get(url, options) {
    try {
      const response = await this._baseRequest(url, options.data, {
        type: 'get',
        auth: options.auth,
      })

      return response
    } catch (e) {
      if (options.showValidationErrors && has(e, 'response.data.message')) {
        this._sendErrorsToStore(e.response.data.message)
      }
    }
  }
}

export default ApiService
