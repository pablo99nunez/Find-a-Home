// IMPORTS
const express = require('express');
const mongoose = require('mongoose');
const routes = require('../src/routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 8080;
const { checkJwt } = require('../src/utils/firebase-stuff');
const { globalLimit } = require('../src/utils/rate-limiters');
// permite leer archivo .env.
require('dotenv').config();

//#region  MONGOOSE
mongoose.set('strictQuery', true);
const DATABASE_URL = process.env.DATABASE_URL
  ? process.env.DATABASE_URL
  : 'mongodb://localhost:27017';
const DATABASE_NAME = process.env.DATABASE_NAME || 'findahome';
const password = process.env.MONGO_PASS;
const URI = process.env.MONGODB_URI;

const app = express();
app.get('/api', async (req, res) => {
  console.log(process.env);
  res.send({
    message: 'Server working',
  });
});
app.get('/api/check-db', async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.send({ message: 'Database connection successful' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Unable to connect to database' });
  }
});
mongoose
  .connect(URI)
  .then(() => {
    console.log('Database connected, starting server');
    //MIDDLEWARES, se meten en todos los request y en todos los sends
    app.use(cors()); //discrimina quien puede hacer peticiones al backend, poner pagina del frontend al deployar.
    app.use(globalLimit);
    app.use(express.json({ limit: '50mb' })); //transforma json en strings automaticamente y viceversa.
    app.use(bodyParser.urlencoded({ extended: true })); //permite anidacion de objetos y arrays
    app.use(express.static('public')); //no recuerdo
    //FIN MIDDLEWARES
    //Todas las Rutas:
    app.use(routes);

    app.get('/api/check', checkJwt, async (req, res) => {
      //setAdmin(req.user.uid)
      try {
        res.send({
          message: 'Token decodificado exitosamente!',
          user: req.user,
        });
      } catch (err) {
        res.send({ message: 'el back exploto' + err.message });
      }
    });
    app.listen(port, () => {
      console.log(`Server has started on port ${port}!`);
    });
  })
  .catch((error) => {
    throw new Error(error);
  });

module.exports = app;
