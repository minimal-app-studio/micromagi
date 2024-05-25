const { AsyncLocalStorage } = require("async_hooks");

class AsyncStore {
  constructor() {
    this.asyncLocalStorage = new AsyncLocalStorage();
    this.context = {};
  }

  getCurrentContext() {
    return this.asyncLocalStorage.getStore() || this.context;
  }

  set(key, value) {
    const store = this.getCurrentContext();
    store[key] = value;
    this.asyncLocalStorage.enterWith(store);
  }

  get(key) {
    const store = this.getCurrentContext();
    return store[key];
  }
}

// single async store
module.exports = new AsyncStore();
