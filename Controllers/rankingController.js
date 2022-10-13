const Jugador = require('../models/Jugador');


const getPlaceController = async (req, res) => {
    try {
        //Query data from db
        let allUsers = await Jugador.findAll(); 
        
        //extract interesting data and sort it
        allUsers = allUsers.map((j) => j.dataValues); //extract dataValues
        allUsers = allUsers.sort((j1, j2) => (j2.winRate - j1.winRate));
        // console.log(allUsers);
        
        //respond
        if (allUsers.length === 0) {
            allUsers = {
                "ranking":allUsers
            }
            allUsers["msg"] = "no users to show"; //Li estas declarant la prop msg quan encara es una array burro
            res.send(200).send(allUsers);
            return; //Si no poso el return intentara accedir a posicions de la array que no existeixen (allUsers[coses])
        }
        if(req.params.place === "loser") {
            res.status(200).send(allUsers[allUsers.length - 1]);
        }else if (req.params.place === "winner"){
            res.status(200).send(allUsers[0]);
        }else{ //putting this check earlier would be faster but meh
            res.status(404).json({
                "msg":`ranking/${req.params.place} doesnt exist`
            })
        }
    } catch (error) {
       res.status(502).json({
        "msg":"select query failed (ranking w/l get)"
       });
    }
}

const getAllController = async (req, res) => {
    try {
        //query data from db
        let allUsers = await Jugador.findAll(); 
        
        //extract interesting data and sort it
        allUsers = allUsers.map((j) => j.dataValues); //extract dataValues
        allUsers = allUsers.sort((j1, j2) => (j2.winRate - j1.winRate));
        // console.log(allUsers);
        
        //respond with a json, not an array
        allUsers = {
            "ranking":allUsers 
        }//Aquesta assignacio funciona pq sempre al assignar sexecuta primer lo de la dreta i després es fica a la variable de l'esquerra
        if (allUsers.ranking.length === 0) {
            allUsers["msg"] = "no users to show";
        }
        
        res.status(200).send(allUsers);
        
    } catch (error) {
       res.status(502).json({
        "msg":"select query failed (ranking global get)"
       });
    }
}




module.exports = {getPlaceController, getAllController}