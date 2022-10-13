/*
    Primer cal checkejar que existeix el camp "username" al header,
    sino es bad request. Podria fer-ho manualment (Object.getOwnPropertyNames...)
    o distingir entre el cas username='' i username=undefined
*/

function checkUsernameBody (req, res, next){ //Aixo es podria fer mes facil posant un check per undefined en algun lloc mes avall de la ruta pero bueno ja esta fet aixi
    const username = req.body.username;
    
    if(username === undefined) {
        res.status(400).json({
            "msg":"username field missing from body"
        });
        return;
    }
    next();
}

module.exports = checkUsernameBody;