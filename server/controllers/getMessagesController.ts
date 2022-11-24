import { Request, Response } from 'express'
import { Model, ModelStatic } from 'sequelize';
const Message : ModelStatic<Model> = require('../models/Message')

import {message} from '../interfaces'

async function getMessagesController (req : Request, res : Response) {
    // get requested roomId from url query    
    let id = Number(req.query.roomId);
    console.log(id);
    try {
        // query database for messages
        let qResult = await Message.findAll({
            where : {
                roomId : id
            },
            include : { // amb el include faig els joins per portarme dades de les altres taules segons la seva foreign key
                all : true
            }
        });
        // for (let result of qResult) {
        //     console.log(result.dataValues);
        // }
        // map query result to message interface (tinc la sensacio que hi ha una manera molt mes senzilla de fer aixo, pero de moment aixi funciona)
        let messagesInRoom : message[] = qResult.map((result)=> {
            return {
                content : result.dataValues.content,
                username : result.dataValues.User.username,
                userId : result.dataValues.userId,
                roomname :  result.dataValues.Room.roomname, // les dades que estan en una altra taula 
                roomId : result.dataValues.roomId
            }
        });
        console.log(`messagesInRoom`);
        console.log(messagesInRoom);
        res.status(200).send({
            "msg": "there go all messages in that room",
            "messagesInRoom": messagesInRoom
        });
    } catch (error) {
        // if there was an error in the await, send error message
        console.log(error);
        
        res.status(500).send({
            "msg":"there was an error querying the db"
        })
    }

}



module.exports = getMessagesController;