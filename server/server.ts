import {Express, Request, Response} from 'express' //import types
import { Socket } from 'socket.io'
import {Sequelize} from 'sequelize';
const cors = require('cors')
const express = require('express')
const app : Express = express()
const http = require('http').createServer(app) //create http server with express as function manager for the routes
const io = require('socket.io')(http, {
    cors: {
        origin : '*'
    }
})

const appRouter = require('./routes/globalRouter');
const sqlize : Sequelize = require('./db/getSequelizeInstance');
const createdb = require('./db/createdb');

async function server () {
    await sqlize.authenticate();
    await sqlize.sync({"force": true});


    
    io.on('connection', (socket : Socket) => { //for now it just tells me it works
        console.log('Someone connected through a socket');
        console.log(`See, i have their id here: ${socket.id}`);
    })

    //middlewares ill need: cors to share resources from a different port and urlencoded to acces urlencoded body of requests
    app.use(cors())
    app.use(express.urlencoded({extended:true}))

    //all routes should go here
    app.use('/',appRouter);
    app.use('/', (req: Request, res: Response) => {
        req.body; // just so tsc doesnt complain
        res.status(404).send({
            "msg":"this route does not exist"
        })
    })

    http.listen(3000, () => console.log(`Server escoltant al port 3000`))
}

createdb();
setTimeout(() => server());