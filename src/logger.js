const pino = require("pino");
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const { NodeSDK } = require("@opentelemetry/sdk-node");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");

let logger = null;

function initializeLogger(options) {
  if (!logger) {
    const provider = new NodeTracerProvider();
    new NodeSDK({
      instrumentations: [getNodeAutoInstrumentations()],
    });
    provider.register();
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
