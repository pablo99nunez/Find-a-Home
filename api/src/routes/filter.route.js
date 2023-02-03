const express = require('express');
const {
  filtroSpecie,
  filtroSize,
  filtroAge,
  combinedFilters,
  getPetsByZone,
} = require('../controllers/filterController');
const { findAllPets } = require('../controllers/petController');
const router = express.Router();

//All Pets o filtra por especie
router.get('/specie/:variable', async (req, res) => {
  try {
    if (req.params.variable === 'All') {
      const allPets = await findAllPets({});
      res.send({
        message: `todas las mascotas`,
        payload: allPets,
      });
    } else {
      const allPets = await filtroSpecie(req.params.variable);
      res.send({
        message: `todas los ${req.params.variable}s`,
        payload: allPets,
      });
    }
  } catch (error) {
    res.status(501).send({ error: error.message });
  }
});

//filtra por tamaño
router.get('/size/:tamano', async (req, res) => {
  try {
    const allPets = await filtroSize(req.params.tamano);
    res.send({ message: 'todas las mascotas', payload: allPets });
  } catch (error) {
    res.status(501).send({ error: error.message });
  }
});

//Filtra por especia y tamaño
router.get('/', async (req, res) => {
  try {
    const { specie, size } = req.query;
    const bothFilters = await combinedFilters(specie, size);
    res.send({ message: 'animales filtrades', payload: bothFilters });
  } catch (error) {
    res.status(501).send({ error: error.message });
  }
});

//filtra por edad
router.get('/age/', async (req, res) => {
  try {
    // console.log(req.body.edad);
    const allPets = await filtroAge(req.body.edad);
    res.send({ message: 'todas las edades', payload: allPets });
  } catch (error) {
    res.status(501).send({ error: error.message });
  }
});

//   await Character.find({ rank: { $eq: 'Lieutenant' } });

router.put('/zone/:radius', async (req, res) => {
  try {
    
    const { latitude, longitude } = req.body.coords;
    const allPets = await getPetsByZone(req.params.radius, latitude, longitude);
    res.status(200).send({ message: 'mascotas por zona', payload: allPets });
  } catch (error) {
    res.status(501).send({ error: error.message });
  }
});

module.exports = router;
