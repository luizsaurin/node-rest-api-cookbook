const success = 'success'
const error = 'error'

export const response200 = (res, message, data) => {
  res.status(200).json({
    status: success,
    message,
    data
  })
}

export const response201 = (res, message, data) => {
  res.status(201).json({
    status: success,
    message,
    data
  })
}

export const response204 = (res) => {
  res.status(204).json({
    status: success
  })
}

export const response400 = (res, message) => {
  res.status(400).json({
    status: error,
    message
  })
}
