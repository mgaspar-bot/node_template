const Partida = require("../models/Partida");
const Jugador = require("../models/Jugador");

module.exports = async function actualizeWinrate (id, reset) {
    try {
        if (reset === "reset"){
            await Jugador.update({
                gamesPlayed:0,
                gamesWon:0,
                winRate:0
            },{
                where:{id:id}
            })
            return;
        }
        let playerData = await Jugador.findOne({
            where:{id:id}
        });
        playerData = playerData.dataValues;
        let neWinRate = Math.round((playerData.gamesWon/playerData.gamesPlayed)*100);
        // console.log(neWinRate);
        let affected = await Jugador.update({
            winRate:neWinRate
        },{
            where:{id:id}
        })
        // console.log(affected);
        return;
    } catch (error) {
        console.log(error);
        console.log('Couldnt actualize winrate');
        return;
    }
}