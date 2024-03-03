"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contacts_1 = __importDefault(require("./routes/contacts"));
const login_1 = __importDefault(require("./routes/login"));
const messages_1 = __importDefault(require("./routes/messages"));
const waves_1 = __importDefault(require("./routes/waves"));
const lists_1 = __importDefault(require("./routes/lists"));
const inbox_1 = __importDefault(require("./routes/inbox"));
const home_1 = __importDefault(require("./routes/home"));
const app = (0, express_1.default)();
const port = 3000;
// Adding routes
app.use('/contacts', contacts_1.default);
app.use('/login', login_1.default);
app.use('/messages', messages_1.default);
app.use('/waves', waves_1.default);
app.use('/lists', lists_1.default);
app.use('/inbox', inbox_1.default);
app.use('/', home_1.default);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
