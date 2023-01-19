const express = require('express');
const { filtroSpecie, filtroSize, filtroAge} = require('../controllers/filterController');
const router = express.Router();

//filtra por especie
router.get('/specie/:variable', async (req, res) => {
    try {
      const allPets = await filtroSpecie(req.params.variable)
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

    //filtra por edad
    router.get('/age/', async (req, res) => {
        try {
            // console.log(req.body.edad);
          const allPets = await filtroAge(req.body.edad)
          res.send({message: 'todas las edades', payload: allPets})
        } catch (error) {
          res.status(501).send({ error: error.message })
        }
      })

//   await Character.find({ rank: { $eq: 'Lieutenant' } });

module.exports = router;
