const endpointResponse = ({
  res,
  code = 200,
  status = true,
  message,
  body,
  url,
  options,
}) => {
  res.status(code).json({
    status,
    code,
    message,
    body,
    url,
    options,
  });
};

module.exports = {
  endpointResponse,
};
