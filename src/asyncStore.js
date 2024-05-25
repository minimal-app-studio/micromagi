const { AsyncLocalStorage } = require("async_hooks");

class AsyncStore {
  constructor() {
    this.asyncLocalStorage = new AsyncLocalStorage();
    this.context = {};
  }

  static getInstance() {
    if (!ContextStore.instance) {
      ContextStore.instance = new ContextStore();
    }
    return ContextStore.instance;
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

module.exports = AsyncStore;
