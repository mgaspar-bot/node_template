import { Request, Response } from 'express'
import { Model, ModelStatic } from 'sequelize';

const Room : ModelStatic<Model> = require('../models/Room');
import { room } from '../interfaces';

async function roomsPostController (req : Request, res : Response) {
    // get new roomname from body
    let newRoomname = req.body.newRoomname;
    //query db to make sure it doesnt exist
    try {
        let qResult = await Room.findOne({
            where: {
                roomname : newRoomname
            }
        });
        if (qResult) {  // if it does exist, send error message saying so
            return res.status(409).send({
                "msg" : "there already is a room with this name"
            });
        }
        // insert into db new room
        await Room.upsert({
            roomname : newRoomname
        });
        // send new room object to frontend through http
        qResult = await Room.findOne({
            where: {
                roomname : newRoomname
            }
        });
        //let newRoom : room = qResult?.dataValues; // aixo no ho podem fer pq la primary key que hi ha a dataValues es "id" i no "roomId" i es trenca tot
        let newRoom : room = {
            roomname : qResult?.dataValues.roomname,
            roomId : qResult?.dataValues.id
        }
        res.status(201).send({
            "msg":"room created",
            "newRoom": newRoom
        });
    } catch (error) {
        console.log('error querying db (roomsPostController)');
    }
    // emit roomList event through socket (HOW??)

    // aixo ho farem fent que sigui el client el que avisi al 
    // servidor de sockets, pq em sembla mes facil que fer que 
    // el servidor http i tcp es parlin aqui :(
}


module.exports = roomsPostController;