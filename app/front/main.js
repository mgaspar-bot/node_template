// const socket = io.connect('http://localhost:3000', {"forceNew":true}) //on s'ha declarat la variable io??

import {io} from './node_modules/socket.io-client'

const socket = io('http://localhost:3000')

socket.connect();


