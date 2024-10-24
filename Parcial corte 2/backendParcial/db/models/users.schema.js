const { Schema, model } = require("mongoose");

const user = new Schema(
    {
        nombre: {
            type: String,
            require: true
        },
        contrasena: {
            type: String,
            require: true
        },
        cedula: {
            type: String,
            require: true
        },
        celular: {
            type: String,
            require: true
        },
        ciudad: {
            type: String,
            require: true
        },
        correo: {
            type: String,
            require: true
        },
        // fechaDeNacimiento: {
        //     type: String,
        //     require: true
        // }
        
    }
)

const usuario = model('usuarios', user);

module.exports = {usuario}