const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,'./uploadedFiles');
    },
    filename: function(req, file, cb) {
        if( !(file.mimetype.match(/.jpeg$/) || file.mimetype.match(/.png$/) || file.mimetype.match(/.gif$/) )) {
            req.res.status(400).json({"msg":"file must be .png, .gif or .jpeg`"}) 
            return;
        }
        req.res.status(201);
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage}); 
const uploadMiddleware = upload.single('userImage');

exports.uploadMiddleware = uploadMiddleware;


