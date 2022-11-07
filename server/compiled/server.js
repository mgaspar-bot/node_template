"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require('cors');
const express = require('express');
const app = express();
const http = require('http').createServer(app); //create http server with express as function manager for the routes
const io = require('socket.io')(http, {
    cors: {
        origin: '*'
    }
});
const appRouter = require('./routes/globalRouter');
io.on('connection', (socket) => {
    console.log('Someone connected through a socket');
    console.log(`See, i have their id here: ${socket.id}`);
});
//middlewares ill need: cors to share resources from a different port and urlencoded to acces urlencoded body of requests
app.use(cors());
app.use(express.urlencoded({ extended: true }));
//all routes should go here
app.use('/', appRouter);
app.use('/', (req, res) => {
    req.body;
    res.status(404).send({
        "msg": "this route does not exist"
    });
});
http.listen(3000, () => console.log(`Server escoltant al port 3000`));
//# sourceMappingURL=server.js.map