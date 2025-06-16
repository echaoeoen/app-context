"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const appContext = src_1.default.context();
const domainService = () => {
    const user = appContext.get();
    console.log('triggered', { user });
};
const asyncExecution = async () => {
    domainService();
};
const user = {
    username: 'echaoeoen'
};
appContext.startContext(async () => {
    appContext.set(user);
    await asyncExecution();
});
//# sourceMappingURL=vanilla.js.map