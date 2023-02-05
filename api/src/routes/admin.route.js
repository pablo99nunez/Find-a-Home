const express = require('express');
const {
  findPet,
  findAllPets,
  updatePet,
} = require('../controllers/petController');
const { findAllUsers } = require('../controllers/userController');
const { checkJwt } = require('../utils/firebase-stuff');
const { deletePet } = require('../controllers/deletePet.js');
const UserModel = require('../models/user.model');
const PetModel = require('../models/pet.model');
const router = express.Router();

router.delete('/deletePet', checkJwt, async (req, res) => {
  try {
    const checkUser = await UserModel.findOne({
      _email: req.user.email,
      tipo: 'Admin',
    });
    if (checkUser) {
      const deletePets = await deletePet(req.body.id);
      res.status(200).send('La mascota ha sido eliminada');
    } else {
      res
        .status(501)
        .send({error: 'Necesitas ser admin para eliminar cualquier mascota'});
    }
  } catch (err) {
    res.status(501).send({ error: err.message });
  }
});

router.get('/getAllPets', checkJwt, async (req, res) => {
  try {
    const checkUser = await UserModel.findOne({
      _email: req.user.email,
      tipo: 'Admin',
    });
    if (checkUser) {
      const allPets = await PetModel.find().sort([['created_at', 1]]);
      res.status(200).send(allPets);
    } else {
      res
        .status(501)
        .send({error: 'Necesitas ser admin para obtener toda la lista de mascotas'});
    }
  } catch (err) {
    res.status(501).send({ error: err.message });
  }
});


const aDay = (24*60*60*1000)
const aWeek = (24*60*60*1000)*7
const aMonth = (24*60*60*1000)*30.44

router.get('/analytics/:theParam' , checkJwt, async (req, res) => {
  try {
    const isAllowedUser = await UserModel.findOne({
      _email: req.user.email,
      tipo: 'Admin',
    });
    if (!isAllowedUser) throw new Error('No eres admin o voluntario')
    const now = new Date();

    let allAdoptedPets = await PetModel.find({state: 'Adopted',lastAdoptionDate: { $exists: true }});
    switch (req.params.theParam) {
      case 'day':
        allAdoptedPets = allAdoptedPets.filter(pet => (now - pet.lastAdoptionDate) <= aDay)
        break;
      case 'week':
        allAdoptedPets = allAdoptedPets.filter(pet => (now - pet.lastAdoptionDate) <= aWeek)
        break;
      case 'month':
        allAdoptedPets = allAdoptedPets.filter(pet => (now - pet.lastAdoptionDate) <= aMonth)
        break;
      default:
        break;
    }

      res.status(200).send(allAdoptedPets);
   
  } catch (err) {
    res.status(501).send({ error: err.message });
  }
});


router.get('/reportPets', checkJwt, async (req, res) => {
  try {
    const checkUser = await UserModel.findOne({
      _email: req.user.email,
      tipo: 'Admin',
    });
    if (checkUser) {
      const allPetsReports = await PetModel.find({
        reportes: { $exists: true, $not: { $size: 0 } },
      });
      res.status(200).send(allPetsReports);
    } else {
      // El usuario no es un administrador, devuelve un mensaje de error
      res
        .status(401)
        .send({error: 'No tienes autorización para ver la lista de reportados'});
    }
  } catch (err) {
    res.status(501).send({ error: err.message });
  }
});
router.get('/reportUsers', checkJwt, async (req, res) => {
  try {
    const checkUser = await UserModel.findOne({
      _email: req.user.email,
      tipo: 'Admin',
    });
    if (checkUser) {
      const allPetsReports = await UserModel.find({
        //a
        infracciones: { $exists: true, $not: { $size: 0 } },
      });
      res.status(200).send(allPetsReports);
    } else {
      // El usuario no es un administrador, devuelve un mensaje de error
      res
        .status(401)
        .send({error: 'No tienes autorización para ver la lista de reportados'});
    }
  } catch (err) {
    res.status(501).send({ error: err.message });
  }
});
router.get('/userban', checkJwt, async (req, res) => {
  try {
    const checkUser = await UserModel.findOne({
      _email: req.user.email,
      tipo: 'Admin',
    });
    if (checkUser) {
      const allPetsReports = await UserModel.find({ tipo: 'inhabilitado' });
      res.status(200).send(allPetsReports);
    } else {
      // El usuario no es un administrador, devuelve un mensaje de error
      res
        .status(401)
        .send({error: 'No tienes autorización para ver la lista de reportados'});
    }
  } catch (err) {
    res.status(501).send({ error: err.message });
  }
});
router.put('/ban', checkJwt, async (req, res) => {
  try {
    const { OwenerEmail } = req.body;
    const checkUser = await UserModel.findOne({
      _email: req.user.email,
      tipo: 'Admin',
    });
    if (checkUser) {
      const userABanear = await UserModel.updateOne(
        {email:OwenerEmail},
        { tipo: 'inhabilitado' }
      );
    } else {
      res.status(401).send({error: 'No tienes autorización para bloquear usuarios'});
    }
  } catch (err) {
    res.status(501).send({ error: err.message });
  }
});

router.put('/desbanear', checkJwt, async (req, res) => {
  try {
    const { OwenerEmail } = req.body;
    const checkUser = await UserModel.findOne({
      _email: req.user.email,
      tipo: 'Admin',
    });
    if (checkUser) {
      const userAdesBanear = await UserModel.updateOne(
        {email:OwenerEmail},
        { tipo: 'User' }
      );    } else {
      res.status(401).send({error:'No tienes autorización para desbloquear usuarios'});
    }
  } catch (err) {
    res.status(501).send({ error: err.message });
  }
});

router.get('/checkPetsByEmail', checkJwt, async (req, res) => {
  try {
    const { OwnerEmail } = req.body;
    const checkUser = await UserModel.findOne({
      _email: req.user.email,
      tipo: 'Admin',
    });
    if (checkUser) {
      
      const findPets = await PetModel.find({ owner: OwnerEmail });
    if(findPets){
    res.status(200).send(findPets)
  }else{
    res.status(401).send({error:'No tenemos mascotas con ese email'});
  }
    } else {
      res.status(401).send({error:'No tienes autorización para desbloquear usuarios'});
    }
  } catch (err) {
    res.status(501).send({ error: err.message });
  }
});

module.exports = router;
