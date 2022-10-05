const {Jugador} = require('../models/Jugador');

async function validateNom(req, res, next) {
    /*
    Primer cal checkejar que existeix el camp "username" al header,
    sino es bad request. Podria fer-ho manualment (Object.getOwnPropertyNames...)
    o distingir entre el cas username='' i username=undefined
    */
    const newUsername = req.headers.username;
    
    if (newUsername === ""){
        // console.log(`Estic al cas Anonim`);
        req.headers.username = "Anonim";
        next();
        return; //encara que cridi a next, segueix executant-se el middleware si no poso el return
    }

    //Check si es unic
    try{
        const found = await Jugador.findOne({
            where: {
                nom:newUsername
            }
        });  
        
        if (!found) {
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

module.exports = validateNom;