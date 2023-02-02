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
        .send('Necesitas ser admin para eliminar cualquier mascota');
    }
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
        .send('No tienes autorización para ver la lista de reportados');
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
        .send('No tienes autorización para ver la lista de reportados');
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
        .send('No tienes autorización para ver la lista de reportados');
    }
  } catch (err) {
    res.status(501).send({ error: err.message });
  }
});
router.put('/ban', checkJwt, async (req, res) => {
  try {
    const { id } = req.body;
    const checkUser = await UserModel.findOne({
      _email: req.user.email,
      tipo: 'Admin',
    });
    if (checkUser) {
      const userABanear = await UserModel.updateOne(
        { id },
        { tipo: 'inhabilitado' }
      );
    } else {
      res.status(401).send('No tienes autorización para bloquear usuarios');
    }
  } catch (err) {
    res.status(501).send({ error: err.message });
  }
});
router.put('/desbanear', checkJwt, async (req, res) => {
  try {
    const { id } = req.body;
    const checkUser = await UserModel.findOne({
      _email: req.user.email,
      tipo: 'Admin',
    });
    if (checkUser) {
      const userABanear = await UserModel.updateOne({ id }, { tipo: 'User' });
    } else {
      res.status(401).send('No tienes autorización para desbloquear usuarios');
    }
  } catch (err) {
    res.status(501).send({ error: err.message });
  }
});

module.exports = router;
