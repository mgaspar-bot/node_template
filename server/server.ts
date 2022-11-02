import {Express, Request, Response} from 'express'

const express = require('express')
console.log(express.constructor.name);

const app : Express = express()
const httpServer = require('http')(app)
const io = require('socket.io')


app.use(express)



app.get('/', (req : Request, res : Response) => {
    console.log(req);
    res.send({"msg":"hello world"});
    
})

httpServer.listen(3000, () => console.log(`Server escoltant al port 3000`))