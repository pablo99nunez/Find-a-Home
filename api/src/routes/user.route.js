const express = require('express');
const { confirmAdoption } = require('../controllers/adoptionController');
const { findUser, updateUser, findAllUsers, createNewUser } = require('../controllers/userController');
const validateroute = require('./validateroute');
const { checkJwt } = require('../utils/firebase-stuff');
const router = express.Router();

//loggeeado, todos, por body mandar "email" de a quien se quiera revisar:
router.get('/profile', checkJwt, async (req, res) => {
  try {
    const userEmail = req.body.email
    const user = await findUser(userEmail)
    res.send(user)
  } catch (error) {
    res.status(501).send({ error: error.message })
  }
})
//loggeado, admin, lista todos los usuarios
router.get('/', checkJwt, async (req, res) => {
  try {
    const filter = req.body
    if (!filter) filter = {}
    const users = await findAllUsers(filter)
    res.status(200).send(users)
  } catch (error) {
    res.status(501).send({ error: error.message })
  }
})
// checkJwt,
//logeado, user, crea un usuario con los datos del token + los q se manden por body
router.post('/', async (req, res) => {
  try {

    // const newUser = Object.assign(req.body, {
    //   email: req.user.email,
    //   email_verified: req.user.email_verified,

    // })
    const newUser = req.body;
    console.log(newUser);

    const createdUser = await createNewUser(newUser)
    res.status(200).send(createdUser)
  } catch (error) {
    res.status(501).send({ error: error.message })
  }
})

//logeado, edita a uno mismo, solo puede editarse a si mismo
router.put('/profile', checkJwt, async (req, res) => {
  try {
    const newUserData = req.body
    const updatedUser = await updateUser(newUserData, req.user.email)
    res.status(200).send({ message: 'usuario editado', payload: updatedUser });
  } catch (err) {
    res.status(501).send({ error: err.message })
  }
});

//por body tiene q entrar 2 parametros
//el email del nuevoOwner "newOwnerEmail": "asdasd@gmail.com"
//el id del perro "petID": "id del perro"
// {petID: "ada8d56asd5as", newOwnerEmail: "asdasasd@gmail.com"}
router.put('/confirm', checkJwt, async (req, res) => {
  try {
    const parametros = [req.body.petID, req.user.email, req.body.newOwnerEmail]
    validateroute["/user/confirm"](...parametros)
    const petWithNewOwner = await confirmAdoption(...parametros)
    res.status(200).send({ message: 'Mascota cambio de dueño y ubicación:', payload: petWithNewOwner });
  } catch (err) {
    res.status(501).send({ error: err.message })
  }
});





module.exports = router;
