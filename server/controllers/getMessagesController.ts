import { Request, Response } from 'express'
import { Model, ModelStatic } from 'sequelize';
const Message : ModelStatic<Model> = require('../models/Message')

import {message} from '../interfaces'

async function getMessagesController (req : Request, res : Response) {
    // get requested roomId from url query
    let id = req.query.roomId;
    try {
        // query database for messages
        let qResult = await Message.findAll({
            where : {
                roomId : id
            }
        });
        // map query result to message interface (tinc la sensacio que hi ha una manera molt mes senzilla de fer aixo, pero de moment aixi funciona)
        let messagesInRoom : message[] = qResult.map((result)=> {
            return {
                content : result.dataValues.content,
                username : result.dataValues.username,
                userId : result.dataValues.userId,
                roomname :  result.dataValues.roomname,
                roomId : result.dataValues.roomId
            }
        });
        res.status(200).send({
            "msg": "there go all messages in that room",
            "messagesInRoom": messagesInRoom
        });
    } catch (error) {
        // if there was an error in the await, send error message
        res.status(500).send({
            "msg":"there was an error querying the db"
        })
    }

}



module.exports = getMessagesController;