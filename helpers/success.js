const endpointResponse = ({
  res,
  code = 200,
  status = true,
  message,
  body,
  token,
  options,
}) => {
  res.status(code).json({
    status,
    code,
    message,
    body,
    token,
    options,
  })
}

module.exports = {
  endpointResponse,
}
