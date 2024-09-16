"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UUID = require("uuid");
const async_hooks_1 = require("async_hooks");
class AppContext {
    constructor() {
        this.context = new Map();
        this.asyncLocalStorage = new async_hooks_1.AsyncLocalStorage();
    }
    static context() {
        if (!this.service) {
            AppContext.service = new AppContext();
        }
        return AppContext.service;
    }
    async startContext(fn) {
        const id = UUID.v4();
        this.context.set(id, {});
        const res = await this.asyncLocalStorage.run(id, fn);
        this.context.delete(id);
        return res;
    }
    get() {
        const id = this.asyncLocalStorage.getStore();
        if (!id) {
            throw new Error('No context found');
        }
        return this.context.get(id) || {};
    }
    set(contextData) {
        const id = this.asyncLocalStorage.getStore();
        const context = this.get();
        this.context.set(id, {
            ...context,
            ...contextData,
        });
    }
}
exports.default = AppContext;
//# sourceMappingURL=app-context.js.map