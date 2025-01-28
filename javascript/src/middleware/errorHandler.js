const resolveErrorType = (err) => {
  // MongoServerError - E11000 duplicate key error
  if (err.name === 'MongoServerError' && err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]
    const value = err.keyValue[field]
    const customErrorMessage = `The ${field} "${value}" is unavailable. Please use a different value.`
    return { statusCode: 400, message: customErrorMessage }
  }

  // Add other errors here if needed
}

const errorHandler = (err, req, res, next) => {
  const customErrorInfo = resolveErrorType(err)

  const statusCode = customErrorInfo.statusCode || err.statusCode || 500

  const response = {
    status: 'error',
    message: customErrorInfo.message || err.message || 'Internal Server Error'
  }

  // const excludeErrorStackStatus = [401, 403, 404, 501]
  // if (process.env.NODE_ENV === 'development' && !excludeErrorStackStatus.includes(statusCode)) {
  //   response.stack = err.stack
  // }

  res.status(statusCode).json(response)
}

export default errorHandler
