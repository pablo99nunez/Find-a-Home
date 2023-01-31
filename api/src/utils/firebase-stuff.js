//FIREBASE INIT
// permite leer archivo .env.
require('dotenv').config();
//firebaseAdmin es un objeto que tiene privilegios de admin en firebase
var firebaseAdmin = require("firebase-admin")
var firebaseJson = require(process.env.GOOGLE_APPLICATION_CREDENTIALS); //ruta a json descargado de la pagina de firebase
const dbUrl = "https://findahomehenry-default-rtdb.firebaseio.com";
//aqui se le otrogan los privilegios de admin dandole la ruta al .json descargado de firebase
const app = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseJson),
  databaseURL: dbUrl,
});

const setAdmin = (uid) => {
  firebaseAdmin.auth(app).setCustomUserClaims(uid, { admin: true, volunteer: true, user: true })

}
//rellena el req con una nueva clave "user" ahora se puede hacer req.user al decodificar correcamente el token
const checkJwt = (req, res, next) => { //jason web token
  if (!req.headers.authorization) {
    return res.status(401).send("Te olvidaste de enviar por header el token! Authorization: Bearer TOKEN_DE_FIREBASE");
  }
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    return res.status(401).send("Te olvidaste el authorization del header incie en Bearer, ejemplo 'Bearer TOKEN_ID'");
  }
  firebaseAdmin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedIdToken) => {
      //se ha creado una propiedad "user" en el req
      //y está guardando la decodificacion, la decodificacion son todos los datos del usuario
      req.user = decodedIdToken;
      return next();
    })
    .catch((error) => {//                                               
      return res.status(401).send("Tu token está mal no se decodificó" + error.message);
    });
};
const messaging = firebaseAdmin.messaging();
module.exports = {
  checkJwt,
  setAdmin,
  messaging,
};