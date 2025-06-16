"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setExpressContext = exports.getExpressContext = exports.expressAppContext = void 0;
const app_context_1 = require("../app-context");
const expressAppContext = (preRequestFn) => (req, res, next) => {
    const context = app_context_1.default.context();
    context.startContext(async () => {
        context.set({ req });
        await Promise.resolve(preRequestFn(req, res));
        next();
    });
};
exports.expressAppContext = expressAppContext;
const getExpressContext = () => {
    return app_context_1.default.context().get();
};
exports.getExpressContext = getExpressContext;
const setExpressContext = (contextData) => {
    app_context_1.default.context().set(contextData);
};
exports.setExpressContext = setExpressContext;
//# sourceMappingURL=express-middleware.js.map