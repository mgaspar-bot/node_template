const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,'./uploadedFiles');
    },
    filename: function(req, file, cb) {
        if( !(file.mimetype.match(/.jpeg$/) || file.mimetype.match(/.png$/) || file.mimetype.match(/.gif$/) )) {
            
            // console.log(`Error: i don't like this filetype I'm not posting it`);
            // return; //Aixi la request es queda pendent

            return cb(new Error(`File must be .png, .gif or .jpeg`)); //Si no li poses el return el file es puja igual
                                                                                //i amb el nom que he posat a sota, aixi que esta tornant a cridar cb (ara sense error) i aqui
                                                                                //ningu es queixa
        }
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
/*
multer.diskStorage configura exactament com es farà la upload:
sempre se li passa un objecte amb dos fields: destination i filename
que accepten sempre aquests tres paràmetres:
    req i file, així les funcions tenen accès als objectes 
        de la request i de la file pujada
    cb és un callback que controla com seguirà la execució:
        el primer parametre que li passem és null pq segueix una 
        convencio de node.js que ja haviem vist:

        fs.readFile('./myFile.txt', (err, data) => {
            if (err)
                throw err;
            console.log(data);
        });

        la següent funció que executi multer per uploadejar la nostra
        file segurament estarà escrita com el readFile de dalt,
        en el que el primer paràmetre està reservat per controlar si hi ha
        un error.
        El segon paràmetre son les dades que la següent funcio necessitarà
        (el nom del arxiu i la carpeta de destinació en cada cas)ç

Un cop fet el objecte multer.diskStorage per configurar com es fa la pujada,
li passem a la funció multer per tenir un "objecte pujador de arxius"
configurat com volem
*/

const upload = multer({ storage}); // tmb puc posar "storage":storage o storage:storage però amb dest:storage peta

const uploadMiddleware = upload.single('userImage');
//Del "objecte pujador d'arxius" ens quedem amb el mètode single,
//que es el que serveix per pujar un sol arxiu. També hi ha upload.many
//i altres opcions per pujar més d'un arxiu però per aquest exercici
// el upload.single és el que ens cal utilitzar de middleware.

/* El parametre que accepta és, dins el objecte request
que esperes rebre per POST, la key que te com a value el arxiu
*/
exports.uploadMiddleware = uploadMiddleware;

