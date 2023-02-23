//FIREBASE INIT
// permite leer archivo .env.
require('dotenv').config();
//firebaseAdmin es un objeto que tiene privilegios de admin en firebase
var firebaseAdmin = require('firebase-admin');
let privateKey = process.env.GOOGLE_PRIVATE_KEY;
if (!privateKey) {
  console.error('Private Key is invalid: ', privateKey);
}
var firebaseJson = {
  type: 'service_account',
  project_id: 'findahomehenry',
  private_key_id: 'f5e5a4846ff32565ac96426de9bf1e4d9ec4c668',
  private_key: privateKey,
  client_email:
    'firebase-adminsdk-zdaa9@findahomehenry.iam.gserviceaccount.com',
  client_id: '107705782190247590572',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zdaa9%40findahomehenry.iam.gserviceaccount.com',
};
//ruta a json descargado de la pagina de firebase
const dbUrl = 'https://findahomehenry-default-rtdb.firebaseio.com';
//aqui se le otrogan los privilegios de admin dandole la ruta al .json descargado de firebase
const app = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseJson),
  databaseURL: dbUrl,
});
const UserModel = require('../models/user.model');

const setAdmin = (uid) => {
  firebaseAdmin
    .auth(app)
    .setCustomUserClaims(uid, { admin: true, volunteer: true, user: true });
};
const extractUserData = async (uid) => {
  return await firebaseAdmin
    .auth(app)
    .getUser(uid)
    .then((userRecord) => userRecord.toJSON())
    .catch((err) => err.message);
};

//rellena el req con una nueva clave "user" ahora se puede hacer req.user al decodificar correcamente el token
const checkJwt = (req, res, next) => {
  //jason web token
  if (!req.headers.authorization) {
    return res
      .status(401)
      .send(
        'Te olvidaste de enviar por header el token! Authorization: Bearer TOKEN_DE_FIREBASE'
      );
  }
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else {
    return res
      .status(401)
      .send(
        "Te olvidaste el authorization del header incie en Bearer, ejemplo 'Bearer TOKEN_ID'"
      );
  }
  firebaseAdmin
    .auth()
    .verifyIdToken(idToken)
    .then(async (decodedIdToken) => {
      //se ha creado una propiedad "user" en el req
      //y está guardando la decodificacion, la decodificacion son todos los datos del usuario
      req.user = decodedIdToken;
      if (!decodedIdToken.hasOwnProperty('email')) {
        const data = await extractUserData(decodedIdToken.uid);
        req.user = { ...req.user, ...data.providerData[0] };
      }
      return next();
    })
    .catch((error) => {
      //
      return res
        .status(401)
        .send('Tu token está mal no se decodificó' + error.message);
    });
};

const checkAdmin = async (req, res, next) => {
  //jason web token
  try {
    const checkUser = await UserModel.findOne({
      _email: req.user.email,
      tipo: 'Admin',
    });
    if (!checkUser) {
      return res.status(501).send('No eres admin: ' + req.user.email);
    } else {
      return next();
    }
  } catch (err) {
    res.status(501).send(err.message);
  }
};

const checkVolunteer = async (req, res, next) => {
  //jason web token
  try {
    const checkUser = await UserModel.findOne({
      _email: req.user.email,
      tipo: 'Volunteer',
    });
    if (!checkUser) {
      return res.status(501).send('No eres Voluntario: ' + req.user.email);
    } else {
      return next();
    }
  } catch (err) {
    res.status(501).send(err.message);
  }
};
const messaging = firebaseAdmin.messaging();
module.exports = {
  checkJwt,
  checkAdmin,
  checkVolunteer,
  setAdmin,
  messaging,
  extractUserData,
};
