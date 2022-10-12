const Admin = require("../models/Admin");


async function adminLogin(req, res, next) {
    try {
        const name = req.body.name;
        const password = req.body.password

        //Si name o password son incorrectes o undefined, aquesta query fallara    
        const found = await Admin.findOne({
            where:  {
                "name":name,
                "password":password
            }
        });
        if (!found) {
            res.status(401).json({
                "msg":"tu no ets el meu estimat admin! fora d'aqui!"
            });
            return;
        }
        next();
        
    } catch (error) {
        console.log(error.mesage);
        res.status(401).json({
            "msg":"tu no ets el meu estimat admin! fora d'aqui! (catch)"
        });
    }
    
}




module.exports = adminLogin;