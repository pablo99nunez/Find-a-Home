const express = require('express');
const { findPet, findAllPets, createNewPet, updatePet } = require('../controllers/petController');
const router = express.Router();

//get all pets
router.get('/', async (req, res) => {
  try {
    await findAllPets({})
  } catch (error) {
    res.status(501).send({ error: error.message })
  }
})

//create pet
router.post('/', async (req, res) => {
  try {
    const newPet = req.body
    await createNewPet(newPet)
  } catch (error) {
    res.status(501).send({ error: error.message })
  }
})

//get by ID
router.get('/:ID', async (req, res) => {
  try {
    const pet = await findPet(req.params.ID)
    res.send(pet)
  } catch (error) {
    res.status(501).send({ error: error.message })
  }
})

//modify pet
router.put('/:ID', async (req, res) => {
  try {
    const modifiedPetData = req.body
    const updatedUser = await updatePet(modifiedPetData, req.params.ID)
    res.send({ message: 'usuario editado', payload: updatedUser });
  } catch (err) {
    res.status(501).send({ error: err.message })
  }
});

module.exports = router;
