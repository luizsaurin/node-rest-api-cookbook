const SUCCESS = 'success'

export const response200 = (res, message, data) => {
  res.status(200).json({
    status: SUCCESS,
    message,
    data
  })
}

export const response201 = (res, message, data) => {
  res.status(201).json({
    status: SUCCESS,
    message,
    data
  })
}

export const response204 = (res) => {
  res.status(204).json({
    status: SUCCESS
  })
}
