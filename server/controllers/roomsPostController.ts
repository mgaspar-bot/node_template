import { Request, Response } from 'express'


async function roomsPostController (req : Request, res : Response) {
    // get new roomname from params or body
    //query db to make sure it doesnt exist
        // if it does, send error message saying so
    // insert into db new room
    // send new room object to frontend through http

    // emit roomList event through socket (HOW??)
    res.status(200).send({
        "msg":"i got your post request in the correct controller!",
        "bodyReceived": req.body.newRoomname
    });
}


module.exports = roomsPostController;