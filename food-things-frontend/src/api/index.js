import axios from 'axios'
import store from '@/store'
import {
  ADD_MULTIPLE_ALERTS_ACTION,
  ADD_ALERT_ACTION,
} from '@/store/modules/alerts/types'
import has from 'lodash/has'

const BASE_URL = '//localhost:3000/api'

/**
 * Function to make a request to API.
 * @param {string} url The URL to make the request to.
 * @param {object} data The data to send with the request.
 * @param {object} options Additional options.
 */
async function base_request(url, data, options) {
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

/**
 * Takes in an array of error messages from a request, and sends them to the store.
 * @param {array} errors The array of error objects.
 */
function sendErrorsToStore(errors) {
  if (typeof errors === 'string') {
    store.dispatch(ADD_ALERT_ACTION, {
      message: errors,
      type: 'error',
      timeout: 3000,
    })
    return
  }

  const messages = []
  let timeout = 3000

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

/**
 * Makes a POST request to the API.
 * @param {string} url The URL to send to.
 * @param {object} data The data to send.
 * @returns What was returned from the server.
 */
export async function post(url, options) {
  try {
    const response = await base_request(url, options.data, {
      type: 'post',
      auth: options.auth,
    })
    return response
  } catch (e) {
    if (options.showValidationErrors && has(e, 'response.data.message')) {
      sendErrorsToStore(e.response.data.message)
    }
  }
}

export async function get(url, options) {
  try {
    const response = await base_request(url, options.data, {
      type: 'get',
      auth: options.auth,
    })
    return response
  } catch (e) {
    if (options.showValidationErrors && has(e, 'response.data.message')) {
      sendErrorsToStore(e.response.data.message)
    }
  }
}
