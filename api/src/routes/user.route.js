const express = require('express');
const { confirmAdoption, refreshStates, rejectedCandidateNofication } = require('../controllers/adoptionController');
const { findUser, updateUser, findAllUsers, createNewUser } = require('../controllers/userController');
const validateroute = require('./validateroute');
const { checkJwt } = require('../utils/firebase-stuff');
const { ratingUpdate } = require('../controllers/ratingUserController');
const { cleanUserInexistentPets } = require('../controllers/deletePet');
const { limit5cada30minutos } = require('../utils/rate-limiters');
const router = express.Router();

//loggeeado, todos, envia los datos de quien hizo la peticion mediante el token:
router.get('/profile', checkJwt, async (req, res) => {
    try {
        const email = req.user.email
        const user = await findUser(email)
        if(user)
        res.send(user)
        else
        throw new Error('Usuario no se encontró en la base de datos')
    } catch (error) {
        res.status(501).send( error.message )
    }
})

router.get('/checkemail', limit5cada30minutos, async (req, res) => {
    try {
        const {email} = req.query
        const user = await findUser(email)
        if(user)
        res.send({message: 'checked', payload: true})
        else
        res.send({message: 'checked', payload: false})
    } catch (error) {
        res.status(501).send( error.message )
    }
})
//loggeado, todos, lista todos los usuarios o encuentra al usuario por email
router.get('/', checkJwt, async (req, res) => {
    try {
        const email = req.query
        if (!email) email = {}
        const users = await findAllUsers(email)
        res.status(200).send(users)
    } catch (error) {
        res.status(501).send( error.message )
    }
})
// checkJwt,
//logeado, user, crea un usuario con los datos del token + los q se manden por body
//Tabien sirve como ruta de edicion por ahora.
router.post('/', checkJwt, async (req, res) => {
    try {
        //para q no pueda cambiar su email desde el body
        const newUser = Object.assign(req.body, {
            email: req.user.email,
            email_verified: req.user.email_verified,
        })
        const createdUser = await createNewUser(newUser)
        res.status(200).send(createdUser)
    } catch (error) {
        res.status(501).send( error.message )
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
        res.status(501).send( err.message )
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
        // console.log(parametros, puntaje)
        validateroute["/user/confirm"](...parametros)
        const petWithNewOwner = await confirmAdoption(...parametros)
        await ratingUpdate(...puntaje)
        await refreshStates({ petID: req.body.petID, newOwnerEmail: req.body.newOwnerEmail })
        await rejectedCandidateNofication({petID: req.body.petID, newOwnerEmail: req.body.newOwnerEmail})
        return res.status(200).send({ message: 'Mascota cambió de dueño:', payload: petWithNewOwner });
    } catch (err) {
        res.status(501).send( err.message )
    }
});

router.put('/cleanup', checkJwt, async (req, res) => {
    try {
        const { email } = req.body
        if (email) {
            const cleanedUser = await cleanUserInexistentPets(email)

            res.status(200).send({ message: 'Lista de pets de usuario limpia', payload: cleanedUser });
        } else {
            throw new Error("Debes enviar un email por body")
        }
    } catch (error) {
        res.status(501).send( err.message )
    }
})



module.exports = router;
