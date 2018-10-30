const crypto = require('crypto')

export default () => ({
  type: 'success',
  message: crypto.randomBytes(5).toString('hex'),
  timeout: 3000,
})
