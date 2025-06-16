"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const src_1 = require("../src");
const app = express();
const preRequestFn = async (req, res) => {
    console.log('Pre-request function is called!');
    const userData = {
        username: 'echaoeoen'
    };
    (0, src_1.setExpressContext)({ user: userData });
};
app.use((0, src_1.expressAppContext)(preRequestFn));
app.get('/user', (req, res) => {
    const context = (0, src_1.getExpressContext)();
    res.json({
        message: 'Hello, User!',
        userId: context.user,
    });
});
app.listen(4000, () => {
    console.log('Server is running on http://localhost:3000');
});
//# sourceMappingURL=express.js.map