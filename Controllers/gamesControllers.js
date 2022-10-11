const Partida = require('../models/Partida');
const Jugador = require('../models/Jugador')
const tirarDaus = require('../utils/tirarDaus');
const actualizeWinrate = require('../utils/actualizeWinrate');

const postController = async (req, res) => {
    //getId from the field validateId wrote
    const idReceived = req.idReceived; //Si definim el :id a la ruta global del endpoint, no hi podem accedir des d'aqui
    
    //throw dices, did you win?
    const tirada = tirarDaus();
    let won = (tirada[0] + tirada[1] === 7) ? 1 : 0;
    let info = won? "you won!":"try again";
    
    try {
        //Insert partida into db
        await Partida.upsert({ //ojo pq com que no valides ids aqui, pots acabar introduint JugadorId nulls a la db
            dau1:tirada[0],
            dau2:tirada[1],
            JugadorId:idReceived
        });
        //update player data in db
        await Jugador.update({
            gamesPlayed:sequelize.literal("gamesPlayed + 1"),//sequelize magic IMPORTANT!!
            gamesWon:sequelize.literal(`gamesWon+${won}`)
        },{
            where:{
                id:idReceived
            }
        });
        actualizeWinrate(idReceived); //i'm not waiting for this execute, does it matter?

        //respond
        res.status(201).json({
            "msg":"result successfully stored",
            "dau1":tirada[0],
            "dau2":tirada[1],
            "info":info
        });
    } catch (error) {
        res.status(502).json({
            "msg":"insert or update query failed (games POST controller)"
        })
    }
}

const getController = async (req, res) => {
    var idReceived = req.idReceived; //Ojo pq /:id est`à definit al router "global" del endpoint, a routes.js
    
    var matches;
    try {
        matches = await Partida.findAll({
            where: {
                JugadorId: idReceived
            }
        });     
        const allMatches = {
            "id":idReceived,
            "partides": matches
        }
        if (matches.length === 0) {
            allMatches["msg"] = "no games to show";
        }
        res.status(200).send(allMatches);
    } catch (error) {
        res.status(502).json({
            "msg":"Select query failed (get Games controller)"
        })
        return;
    }
}

const deleteController = async (req, res) => {
    const idReceived = req.idReceived;

    try {
        let numberOfRows = await Partida.findAndCountAll({
            where:{
                JugadorId:idReceived
            }
        });
        numberOfRows = numberOfRows.count;
        let deletedRows = await Partida.destroy({
            where: {
                JugadorId:idReceived
            }
        });
        actualizeWinrate(idReceived, "reset");
        if (deletedRows === numberOfRows) {
            res.status(200).json({
                "msg":`stored games for player with id ${idReceived} were erased`
            })
        }else{
            res.status(500).json({
                "msg":"l'has liat parda no se ni com"
            })
        }
    } catch (error) {
        res.status(502).json({
            "msg":"find or delete query failed (games delete controller)"
        });
    }
        

}

module.exports = {postController, getController, deleteController}