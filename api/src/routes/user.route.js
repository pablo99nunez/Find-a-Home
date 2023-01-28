const express = require('express');
const { confirmAdoption, refreshStates } = require('../controllers/adoptionController');
const { findUser, updateUser, findAllUsers, createNewUser } = require('../controllers/userController');
const validateroute = require('./validateroute');
const { checkJwt } = require('../utils/firebase-stuff');
const { ratingUpdate } = require('../controllers/ratingUserController');
const { cleanUserInexistentPets } = require('../controllers/deletePet');
const router = express.Router();

//loggeeado, todos, por body mandar "email" de a quien se quiera revisar:
router.get('/profile', checkJwt, async (req, res) => {
  try {
    const email = req.user.email
    const user = await findUser(email)
    res.send(user)
  } catch (error) {
    res.status(501).send({ error: error.message })
  }
})
//loggeado, admin, lista todos los usuarios
router.get('/', checkJwt, async (req, res) => {
  try {
    const filter = req.params
    if (!filter) filter = {}
    const users = await findAllUsers(filter)
    res.status(200).send(users)
  } catch (error) {
    res.status(501).send({ error: error.message })
  }
})
// checkJwt,
//logeado, user, crea un usuario con los datos del token + los q se manden por body
//Tabien sirve como ruta de edicion por ahora.
router.post('/',checkJwt, async (req, res) => {
  try {
    //para q no pueda cambiar su email desde el body
    const newUser = Object.assign(req.body, {
      email: req.user.email,
      email_verified: req.user.email_verified,
    })
    const createdUser = await createNewUser(newUser)
    res.status(200).send(createdUser)
  } catch (error) {
    res.status(501).send({ error: error.message })
  }
})

//logeado, edita a uno mismo, solo puede editarse a si mismo y no puede cambiarse el email
router.put('/profile', checkJwt, async (req, res) => {
  try {
    const newUserData = req.body
    //no puede cambiarse el email:
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
    const puntaje = [req.body.rating, req.body.newOwnerEmail]
    validateroute["/user/confirm"](...parametros)
    const petWithNewOwner = await confirmAdoption(...parametros)
    await ratingUpdate(...puntaje)
    await refreshStates({petID: req.body.petID, newOwnerEmail: req.body.newOwnerEmail})
    res.status(200).send({ message: 'Mascota cambió de dueño:', payload: petWithNewOwner });
  } catch (err) {
    res.status(501).send({ error: err.message })
  }
});

router.put('/cleanup', checkJwt, async (req,res)=>{
try {
    const {email} = req.body     
    if(email){
       const cleanedUser = await cleanUserInexistentPets(email) 
    }else{
        throw new Error("Debes enviar un email por body")
    }
} catch (error) {
    res.status(501).send({ error: err.message })
}
})



module.exports = router;
