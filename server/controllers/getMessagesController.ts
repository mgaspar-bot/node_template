import { Request, Response } from 'express'

function getMessagesController (req : Request, res : Response) {
    let id = req.query.roomId;
    
}



module.exports = getMessagesController;