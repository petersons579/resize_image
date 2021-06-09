const multer  = require('multer');
const crypto = require('crypto');
const {  extname , resolve } = require('path');

module.exports = {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..' ,'..','temp'),
        filename:(req , file , cb ) => {
            crypto.randomBytes(16, (err, res) => {
                if(err) return cb(err)
                
                let dta = new Date().toString().split(" ");
                let hora  = dta[4].toString().split(":")
                let hora_  = hora.join('_')
                console.log(hora_);
                return cb(null , res.toString('hex' )+dta[1] + dta[2] +  dta[3] +"hora"+ hora_ + file.originalname.toLowerCase())
            })
        },
    }),
    limits:{
        fileSize: 4 * 1024 * 1024 * 1024
    },
    fileFilter: (req  , file , cb ) => {
        const allowedMines = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'application/pdf'
        ];
        if(allowedMines.includes(file.mimetype)){
            cb(null,true)
        }else{
            cb( new Error('imagem invalida'));
        }
    }
}