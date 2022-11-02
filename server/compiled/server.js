"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const httpServer = require('http')(app);
const io = require('socket.io');
app.use();
console.log(io);
app.get('/', (req, res) => {
    console.log(req);
    res.send({ "msg": "hello world" });
});
httpServer.listen(3000, () => console.log(`Server escoltant al port 3000`));
//# sourceMappingURL=server.js.map