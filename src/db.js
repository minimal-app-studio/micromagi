const { default: mongooseBase } = require("mongoose");

const mongoose = async (mongoUri, options) => {
  try {
    await mongooseBase.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 5000,
      ...options,
    });
    logger.info("successfully connected with mongodb");
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

module.exports = {
  mongoose,
};
