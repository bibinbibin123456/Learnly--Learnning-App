const multer = require('multer')

const storage= multer.diskStorage({
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

const upload = multer({
    storage,
    limits: {fileSize: 8 * 1024 * 1024},
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed'))
        }
        cb(null, true)
    }
})

module.exports= upload