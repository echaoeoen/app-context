"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setFastifyContext = exports.getFastifyContext = exports.registerFastifyAppContext = void 0;
const middie = require("@fastify/middie");
const app_context_1 = require("../app-context");
const registerFastifyAppContext = async (instance, preRequestFn) => {
    await instance.register(middie);
    instance.use((req, res, next) => {
        const context = app_context_1.default.context();
        context.startContext(async () => {
            context.set({
                req
            });
            await Promise.resolve(preRequestFn(req, res));
            next();
        });
    });
};
exports.registerFastifyAppContext = registerFastifyAppContext;
const getFastifyContext = () => {
    return app_context_1.default.context().get();
};
exports.getFastifyContext = getFastifyContext;
const setFastifyContext = (contextData) => {
    app_context_1.default.context().set(contextData);
};
exports.setFastifyContext = setFastifyContext;
//# sourceMappingURL=fastify-middleware.js.map