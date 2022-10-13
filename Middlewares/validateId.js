const Jugador = require('../models/Jugador');

async function validateId (req, res, next) {
    const idRebut = req.params.id;
    try {
        const found = await Jugador.findOne({
            where: {id:idRebut}
        });
        if (found){
            req["idReceived"] = idRebut; //Aixo es pq els controllers de games puguin accedir al id rebut, ja que no hi arriben des de params
            next();
            return;
        } else {
            res.status(404).json({
                "msg":"id not found"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "msg":"select query failed (validateId)"
        });
    }
}

module.exports = validateId;