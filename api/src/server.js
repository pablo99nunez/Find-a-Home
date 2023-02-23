// IMPORTS
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const {
  checkJwt,
  firebaseAdmin,
  setAdmin,
  extractUserData,
} = require('./utils/firebase-stuff');
const { globalLimit } = require('./utils/rate-limiters');
// permite leer archivo .env.
require('dotenv').config();

//#region  MONGOOSE
mongoose.set('strictQuery', true);
const DATABASE_URL = process.env.DATABASE_URL
  ? process.env.DATABASE_URL
  : 'mongodb://localhost:27017';
const DATABASE_NAME = process.env.DATABASE_NAME || 'findahome';
const password = process.env.MONGO_PASS;
const URI =
  process.env.NODE_ENV == 'development'
    ? `mongodb+srv://pablo99nunez:${password}@findahome.lprcxvm.mongodb.net/?retryWrites=true&w=majority`
    : `mongodb+srv://pablo99nunez:${password}@findahome.lprcxvm.mongodb.net/?retryWrites=true&w=majority`;
async function main() {
  //conecta mongoose a la database
  await mongoose
    .connect(URI)
    .then(() => {
      console.log('Database connected');
    })
    .catch((error) => {
      console.error(error);
    });
  // use  `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main().catch((err) =>
  console.log({ error: 'Error al conectar con la database' + err.message })
); //como main es asincronica, es una promesa, tiene .catch:
//#endregion

const create = async () => {
  //crea el server de express, no lo inicia todavía, tiene q iniciarl luego de conectar a la database
  const app = express();
  //MIDDLEWARES, se meten en todos los request y en todos los sends
  app.use(cors()); //discrimina quien puede hacer peticiones al backend, poner pagina del frontend al deployar.
  app.use(globalLimit);
  app.use(express.json({ limit: '50mb' })); //transforma json en strings automaticamente y viceversa.
  app.use(bodyParser.urlencoded({ extended: true })); //permite anidacion de objetos y arrays
  app.use(express.static('public')); //no recuerdo
  //FIN MIDDLEWARES
  //Todas las Rutas:
  app.use(routes);

  app.get('/', async (req, res) => {
    res.send({
      message: 'Server working',
    });
  });

  app.get('/check', checkJwt, async (req, res) => {
    //setAdmin(req.user.uid)
    try {
      res.send({ message: 'Token decodificado exitosamente!', user: req.user });
    } catch (err) {
      res.send({ message: 'el back exploto' + err.message });
    }
  });

  return app;
};

module.exports = {
  create,
};
