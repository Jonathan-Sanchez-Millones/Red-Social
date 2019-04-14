'use strict'

var mongoose=require('mongoose');
var app=require('./app');
var port=3801;
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/red_social',{useMongoClient:true})
.then(()=>{
    console.log("La conexion ha sido exitosa");
    //Crear servidor
    app.listen(port,()=>{
        console.log("Servidor corriendo en el puerto 3801");
    });
})
.catch(err =>console.log(err));
