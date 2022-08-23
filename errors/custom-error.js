class CustomAPIError extends Error {
	constructor(message, statusCode) {
		super(message)
		this.statusCode = statusCode
		// this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
		// this.isOperational = true
		// Error.captureStackTrace(this, this.constructor)
	}
}

const createCustomError = (msg, statusCode) => {
	return new CustomAPIError(msg, statusCode)
}
module.exports = { createCustomError, CustomAPIError }
