const pino = require("pino");

let logger = null;

function initializeLogger(options) {
  if (!logger) {
    logger = pino(options);
  }
}

// Proxy handler to intercept logger access
const loggerProxy = new Proxy(
  {},
  {
    get: function (target, prop) {
      if (!logger) {
        throw new Error(
          "Logger not initialized. Call initializeLogger(options) first."
        );
      }
      if (!(prop in logger)) {
        throw new Error(`Logger does not have property '${prop}'.`);
      }
      return logger[prop];
    },
  }
);

module.exports = {
  initializeLogger,
  logger: loggerProxy,
};
