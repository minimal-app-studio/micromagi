const respond = (
  res,
  statusCode = 200,
  message = "success",
  body = {},
  headers = {}
) => {
  res.status(statusCode).set(headers);
  if (typeof data === "string") {
    res.send(data);
  } else {
    res.json({
      status: "success",
      message,
      data: body.data || {},
      metadata: body.metadata || {},
    });
  }
};

const handleError = (
  res,
  statusCode = 400,
  message = "something went wrong",
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
