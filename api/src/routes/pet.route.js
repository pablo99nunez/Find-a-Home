const express = require('express');
const { findPet, findAllPets, createNewPet, updatePet, deletePet } = require('../controllers/petController');
const router = express.Router();

//get all pets
router.get('/', async (req, res) => {
  try {
    const allPets = await findAllPets({})
    res.send({message: 'todas las mascotas', payload: allPets})
  } catch (error) {
    res.status(501).send({ error: error.message })
  }
})

//create pet
router.post('/', async (req, res) => {
  try {
    const newPet = await createNewPet(req.body)
    res.status(200).send({ message: 'mascota creada', payload: newPet })
  } catch (error) {
    res.status(501).send({ error: error.message })
  }
})

//get by ID
router.get('/:ID', async (req, res) => {
  try {
    const pet = await findPet(req.params.ID)
    res.send({ message: 'mascota encontrada', payload: pet })
  } catch (error) {
    res.status(501).send({ error: error.message })
  }
})

//modify pet
router.put('/:ID', async (req, res) => {
  try {
    const modifiedPetData = req.body
    const updatedUser = await updatePet(modifiedPetData, req.params.ID)
    res.send({ message: 'mascota modificada', payload: updatedUser });
  } catch (err) {
    res.status(501).send({ error: err.message })
  }
});

//modify pet
router.delete('/:ID', async (req, res) => {
  try {
    const deletedPet = await deletePet(req.params.ID)
    res.send({ message: 'mascota borrada', payload: deletedPet });
  } catch (err) {
    res.status(501).send({ error: err.message })
  }
});

module.exports = router;
