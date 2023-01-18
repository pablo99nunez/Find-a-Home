// IMPORTS
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors')
// permite leer archivo .env.
require('dotenv').config();

//Configuracion de mongoose para conectar con la database
mongoose.set('strictQuery', true)
const DATABASE_URL = process.env.DATABASE_URL ? process.env.DATABASE_URL : 'mongodb://localhost:27017';
const DATABASE_NAME = process.env.DATABASE_NAME || 'findahome';
//conecta mongoose a la database
async function main() {
    await mongoose.connect(DATABASE_URL + '/' + DATABASE_NAME);
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
//como main es asincronica, es una promesa, tiene .catch:
main().catch(err => console.log(err));


//lo vamos a usar en los controllers, NO BORRAR
const timeStamp = (req) => {
    const date = new Date();
    const currentTimeStamp = date.getTime();
    console.log(`${currentTimeStamp} - ${req.protocol}//${req.headers.host}${req.originalUrl}`);
};

const create = async () => {
    //crea el server de express, no lo inicia todavía, tiene q iniciarl luego de conectar a la database
    const app = express();
    //MIDDLEWARES, se meten en todos los request y en todos los sends
    app.use(cors()) //discrimina quien puede hacer peticiones al backend, poner pagina del frontend al deployar.
    app.use(express.json({ limit: "50mb" })) //transforma json en strings automaticamente y viceversa.
    app.use(bodyParser.urlencoded({ extended: true })); //permite anidacion de objetos y arrays
    app.use(express.static('public')); //no recuerdo
    //FIN MIDDLEWARES
    //Todas las Rutas:
    app.use(routes)
    return app
}

module.exports = {
    create
};
