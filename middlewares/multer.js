/* requiero el Path y al middleware Multer que me permite incorporar imágenes al JSON en la propiedad
image, recibe un objeto con destino y nombre de archivo, se lo paso a multer y lo usamo, para eso 
debo crear la variable storage y crear destination (como función con el callback) y la propiedad
filename que nos define un nombre único de archivo, para lo cual utilizo el Date.now()+path.extname... */

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/images/uploads")); //le agregamos carpeta uploads que es donde guardaremos las imágenes que sube el usuario.
    },
    filename: (req, file, cb) => {
        let nameFile = Date.now() + path.extname(file.originalname);
        cb(null, nameFile);
    },
        limits: {
        fileSize: 1024 * 1024 * 5 //5MB
    }   //el limits es para que no se pase del tamaño de archivo que queremos, en este caso hasta 5MB. 
        //Tambien existen los filtros para el tipo de archivo jpg, png, etc. 
});

const upload = multer({ storage });

module.exports = upload;
