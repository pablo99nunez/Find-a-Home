// IMPORTS
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors')
// permite leer archivo .env.
require('dotenv').config();
//firebase
var firebaseAdmin = require("firebase-admin")
var firebaseJson = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);


//MONGOOSE
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
//-----------

//FIREBASE INIT

const firebaseApp = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(firebaseJson)
});
//-----------

//FIREBASE MIDDLEWHARE
const appCheckVerification = async (req, res, next) => {
    const appCheckToken = req.header('X-Firebase-AppCheck');

    if (!appCheckToken) {
        res.status(401);

        console.log('a sadasd');
        return next('Unauthorized');
    }
    try {
        const appCheckClaims = await firebaseAdmin.appCheck().verifyToken(appCheckToken);

        // If verifyToken() succeeds, continue with the next middleware
        // function in the stack.
        console.log('a ver');
        console.log(appCheckClaims);
        return next();
    } catch (err) {
        res.status(401);
        return next('Unauthorized');
    }
}
//-----------

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
    app.get('/check', [appCheckVerification], (req, res) => {
        // Handle request.
        res.send({message: 'endpoint reached'})
    });
    return app
}

module.exports = {
    create
};
