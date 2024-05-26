const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const { NodeSDK } = require("@opentelemetry/sdk-node");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");

const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");

const tracerProvider = new NodeTracerProvider();

new NodeSDK({
  instrumentations: [
    getNodeAutoInstrumentations(),
    new HttpInstrumentation({
      responseHook: (span, response) => {
        response.setHeader("x-trace-id", span._spanContext.traceId);
      },
    }),
  ],
});

tracerProvider.register();

const pino = require("pino");
const pinoCaller = require("pino-caller");

let logger = null;

function initializeLogger(loggerOptions) {
  if (!logger) {
    const { prettyPrint, context, ...rest } = loggerOptions;
    if (prettyPrint) {
      rest["transport"] = {
        target: "pino-pretty",
        options: {
          colorize: true,
        },
      };
    }

    // it will print also the calling site
    baseLogger = pino({
      ...rest,
      mixin() {
        return context;
      },
    });

    // it will print also the calling site
    logger = pinoCaller(baseLogger);
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
  tracerProvider,
};
