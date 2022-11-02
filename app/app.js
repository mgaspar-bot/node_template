const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const cors = require('cors');

app.use(express.static('front')) // aixo que fa?
app.use(cors());

io.on('connection', (socket)=> {
    console.log('Algú sha connectat amb socket');
    
})

app.get('/', (req, res) => {
    res.status(200).send({"msg":"im here"})
})

app.get('/y', (req, res) => {
    res.send({
        "msg":"im working"
    })
})


app.listen(3000, () => console.log('server escoltant al port 3000'))