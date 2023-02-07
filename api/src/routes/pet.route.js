const express = require('express');
const { createPet } = require('../controllers/createPet');
const { findPet, findAllPets, updatePet, filterByOwner,denPet } = require('../controllers/petController');
const {solicitarAdopcion} = require('../controllers/adoptionController')
const { checkJwt } = require('../utils/firebase-stuff');
const { deletePet } = require('../controllers/deletePet');
const { limit5cada12horas } = require('../utils/rate-limiters');
const router = express.Router();

//todos //
router.get('/', async (req, res) => {
  try {
    const allPets = await findAllPets({})
    res.send({message: 'Todas las mascotas', payload: allPets})
  } catch (error) {
    res.status(501).send({ error: error.message })
  }
})
router.get('/:id', async (req, res) => { 
  const petId = req.params.id
  try {
    const getPetById = await findPetById(petId)
    res.send({message: 'Todas las mascotas', payload: getPetById})
  } catch (error) {
    res.status(501).send({ error: error.message })
  }
})

//CREAR PET
//logeado, user, checkJwt te deja pasar si el token esta bien, y ademas
//mete adentro del req una propiedad user con los datos del usuario
router.post('/',limit5cada12horas,checkJwt, async (req, res) => {
  try {
    const PetData = req.body
    const newPet = await createPet(PetData, req.user.email)
    res.status(200).send({ message: 'Mascota creada', payload: newPet })
  } catch (error) {
    res.status(501).send({ error: error.message })


  }
})

//Pet por id en body pasar id
router.get('/profile/', async (req, res) => {
  try {
  
    const pet = await findPet(req.body.id)
    res.send({ message: 'Mascota encontrada', payload: pet})
  
  } catch (error) {
    res.status(501).send({ error: error.message })
  }
})

//logged, user, modifica el PET con lo q le pase por body
router.put('/profile', checkJwt, async (req, res) => {
  try {//prohibir modificar el owner y la history
    const newData = req.body
    const updatedPet = await updatePet(newData, req.body.id, req.user.email)
    res.send({ message: 'Mascota modificada', payload: updatedPet });
  } catch (err) {
    res.status(501).send({ error: err.message })
  }
});


//solicitar perro
router.put('/profile/solicitud',limit5cada12horas, checkJwt, async (req, res) => {
  try {
    //solicitarAdopcion = async (petID, message, interestedEmail, deleteSolicitud)
    const message = req.body.message
    const petID = req.body.petID
    const petConNuevaSolicitud = await solicitarAdopcion(petID, message, req.user.email)
    res.send({ message: 'Solicitud Enviada', payload: petConNuevaSolicitud });
  } catch (err) {
    res.status(501).send({ error: err.message })
  }
});

//quitar solicitud, pasar petID por body
router.delete('/profile/solicitud',checkJwt, async (req, res) => {
  try {
    //solicitarAdopcion = async (petID, message, interestedEmail, deleteSolicitud)
    const petID = req.body.petID
    const message = req.body.message
    const petSinTuSolicitud = await solicitarAdopcion(petID, message, req.user.email,true)
    res.send({ message: 'Solicitud Eliminada', payload: petSinTuSolicitud });
  } catch (err) {
    res.status(501).send({ error: err.message })
  }
});


//SOLO ADMIN PUEDE BORRAR PERROS
router.delete('/profile/:ID',checkJwt, async (req, res) => {
  try {
    const deletedPet = await deletePet(req.params.ID)
    res.send({ message: 'Mascota borrada', payload: deletedPet });
  } catch (err) {
    res.status(501).send({ error: err.message })
  }
});

router.get('/byowner',checkJwt, async (req, res) => {
  try {
    if(req.query.email){
      const pets = await filterByOwner(req.query.email)
      res.status(200).send(pets);
    }else{
   const email = req.user.email

    const allPets = await filterByOwner(email);

    res.send(allPets);
  }
  } catch (error) {
    res.status(501).send({ error: error.message });
  }
});
router.put('/denunciar', checkJwt, async (req, res) => {
  try {//prohibir modificar el owner y la history
    const denuncia = req.body
    const updatedPet = await denPet(denuncia, req.body.id, req.user.email)
    res.send({ message: 'mascota denunciada', payload: updatedPet });
  } catch (err) {
    res.status(501).send({ error: err.message })
  }
});
module.exports = router;
