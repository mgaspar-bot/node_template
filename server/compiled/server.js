"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
require('dotenv').config();
console.log(process.env.DB_USERNAME);
const appRouter = require('./routes/globalRouter');
const sqlize = require('./db/getSequelizeInstance');
const createdb = require('./db/createdb');
function server() {
    return __awaiter(this, void 0, void 0, function* () {
        yield sqlize.authenticate();
        yield sqlize.sync({ "force": true });
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
            req.body; // just so tsc doesnt complain
            res.status(404).send({
                "msg": "this route does not exist"
            });
        });
        http.listen(3000, () => console.log(`Server escoltant al port 3000`));
    });
}
createdb();
setTimeout(() => server());
//# sourceMappingURL=server.js.map