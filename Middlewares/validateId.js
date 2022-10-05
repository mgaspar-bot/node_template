const Jugador = require('../models/Jugador');

async function validateId(req, res, next) {
    try {
        const id = req.url;
        console.log(id);
        const found = await Jugador.findOne({
            id:id
        });
        if (!found) {
            res.status(404).json({
                "msg":"this id does not exist"
            });
            return;
        }
        next();
    }catch(error){
        res.status(500).json({
            "msg":"select query failed (validateId)"
        });
        return;
    }
}

module.exports = validateId;