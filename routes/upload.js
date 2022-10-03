const express = require('express');
const middles = require('../Middlewares/uploadMiddleware');
const router = express.Router();

router.post('/', middles.uploadMiddleware, (req, res) => {
    /*
    Es aqui on puc checkejar per primer cop si hi ha 
    algo a userImage pq és després del multer, 
    per tant hi puc accedir amb req.body.userImage
    (abans del multer req.body està buit, i durant el 
    multer no funciona la comprovació )
    A més dins el multer no tinc acces a response
    
    Potser intentar checkejar que no hi ha file a dintre
    els callbacks del multer no serveix pq multer sen 
    adona que no hi ha file i directament ni els executa.
    Efectivament
    Per tant podria fer que el multer canvies el status
    i el controller comprova el status, si es 201 es que 
    s'han executat i s'ha pujat algo, si es 200 no s'ha pujat res.
    Si no passa el check del mimetype ni arribara al controller
    */
    let status = (res.statusCode == 201) ? 'file uploaded' : 'nothing to upload';
    res.json({"status":status});
   
    /*Forma antiga 
   
   if (!req.body.userImage) {
    res.status(200).json({"status":"nothing to upload"})
    return;
   }
    res.status(201).json({"status":"file uploaded"}) */
    
});

module.exports = router;