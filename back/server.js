//lo vamos a usar para arrancar el servidor 

const app=require('./app');
const connectDB=require('./config/database');
const cloudinary= require("cloudinary")

//setear el archivo de configuracion
const dotenv=require('dotenv'); 
dotenv.config({path:'back/config/config.env'}); //cargamos el archivo de configuracion, path ruta del archivo 
//para que encuentre los archivos de configuracion 

//Configurar Cloudinary
cloudinary.config({ //configuramos cloudinary para usar de manera global
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//conectar a la base de datos
connectDB(); //llamamos a la funcion de conexion a la base de datos

//declaran metodos en js, llamamos al server
const server=app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado en el puerto: ${process.env.PORT} en modo: ${process.env.NODE_ENV}`)
})


//lanzo con npm start en la consola desde el directorio aplicacion 