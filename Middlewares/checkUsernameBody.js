/*
    Primer cal checkejar que existeix el camp "username" al header,
    sino es bad request. Podria fer-ho manualment (Object.getOwnPropertyNames...)
    o distingir entre el cas username='' i username=undefined
*/

function checkUsernameHeader (req, res, next){
    const username = req.body.username;
    
    if(username === undefined) {
        res.status(400).json({
            "msg":"username field missing from body"
        });
        return;
    }
    next();
}

module.exports = checkUsernameHeader;