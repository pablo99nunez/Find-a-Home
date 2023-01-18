const express = require('express');
const { filtroSpecie, filtroSize} = require('../controllers/filterController');
const router = express.Router();

//filtra por especie
router.get('/specie/:variable', async (req, res) => {
    try {
    const especie = req.params.variable
      const allPets = await filtroSpecie(especie)
      res.send({message: 'todas las mascotas', payload: allPets})
    } catch (error) {
      res.status(501).send({ error: error.message })
    }
  })

  //filtra por tamaño
  router.get('/size/:tamano', async (req, res) => {
    try {
        console.log(req.params.tamano);
      const allPets = await filtroSize(req.params.tamano)
      res.send({message: 'todas las mascotas', payload: allPets})
    } catch (error) {
      res.status(501).send({ error: error.message })
    }
  })

//   await Character.find({ rank: { $eq: 'Lieutenant' } });

module.exports = router;
