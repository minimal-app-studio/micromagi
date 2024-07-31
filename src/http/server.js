const respond = (res, statusCode, body, message = "Success", headers = {}) => {
  res.status(statusCode).set(headers);

  if (typeof data === "string") {
    res.send(data);
  } else {
    res.json({
      status: "success",
      message,
      data: body.data,
      metadata: body.metadata || {},
    });
  }
};

const handleError = (
  res,
  statusCode,
  message = "Error occurred",
  headers = {}
) => {
  res.status(statusCode).set(headers).json({
    status: "error",
    message,
  });
};

module.exports = {
  respond,
  handleError,
};
