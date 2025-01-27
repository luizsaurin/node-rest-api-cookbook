/* eslint-disable no-console */
const globalErrorHandler = (err, req, res, next) => {
  const excludeErrorStackStatus = [401, 403, 404, 501]

  const statusCode = err.statusCode || 500

  if (!excludeErrorStackStatus.includes(statusCode)) console.error(err.stack)

  const response = {
    status: 'error',
    message: err.message || 'Internal Server Error'
  }

  if (process.env.NODE_ENV === 'development' && !excludeErrorStackStatus.includes(statusCode)) {
    response.stack = err.stack
  }

  res.status(statusCode).json(response)
}

export default globalErrorHandler
