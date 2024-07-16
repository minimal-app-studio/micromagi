const respond = (res, statusCode, data, message = "Success", headers = {}) => {
  res.status(statusCode).set(headers);

  if (typeof data === "string") {
    res.send(data);
  } else {
    res.json({
      status: "success",
      message,
      data,
    });
  }
};

const handleError = (
  res,
  statusCode,
  error,
  message = "Error occurred",
  headers = {}
) => {
  res
    .status(statusCode)
    .set(headers)
    .json({
      status: "error",
      message,
      error: error.message || error,
    });
};

module.exports = {
  respond,
  handleError,
};
