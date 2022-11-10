"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Automaticament m'ha fet import de Socket aixi,
// els tipus de express els he hagut dinstalar
// per defecte mha fet aixi el import, i sembla que amb
// require no funciona
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*'
    }
});
io.on('connection', (socket) => {
    console.log('Someone connected through a socket');
    console.log(`See, i have their id here: ${socket.id}`);
});
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('../client')); //Now THIS is the shit
// Now my back is serving my front
app.get('/', (req, res) => {
    console.log(req);
    res.send('im working');
}); // express.static sembla que substitueix aquesta ruta
http.listen(3000, () => console.log('Server escoltant al port 3000'));
//# sourceMappingURL=server.js.map