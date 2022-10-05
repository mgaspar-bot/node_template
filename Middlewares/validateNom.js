const {Jugador} = require('../models/Jugador');

async function validateNom(req, res, next) {
    /*
    Primer cal checkejar que existeix el camp "username" al header,
    sino es bad request. Podria fer-ho manualment (Object.getOwnPropertyNames...)
    o distingir entre el cas username='' i username=undefined
    */
    const newUser = req.headers.username;
    console.log(`newUser:${newUser}`);
    if (newUser === undefined) {
        res.status(400).json({
            "msg":"username missing from headers"
        });
        return;
    } else if (newUser === ""){
        console.log(`Estic al cas Anonim`);
        next();
        return; //encara que cridi a next, segueix executant-se el middleware si no poso el return
    }

    //Check si es unic
    try{
        const matches = await Jugador.findAll({
            where: {
                nom:newUser
            }
        }); //matches hauria de ser una array amb els 
        
        if (!matches[0]) { //Si matches no esta buida, [0] no es undefined
            next();
        }else {
            res.status(403).json({
                "msg":"username taken"
            });
            return;
        }
    }catch(error){
        res.status(500).json({
            "msg":"Select query failed"
        });
        return;
    }
}

function nomUnic(newUser) {
    
}
module.exports = validateNom;