const express = require('express');
const {
    findPet,
    findAllPets,
    updatePet,
} = require('../controllers/petController');
const { findAllUsers } = require('../controllers/userController');
const { checkJwt, checkAdmin } = require('../utils/firebase-stuff');
const { deletePet } = require('../controllers/deletePet.js');
const UserModel = require('../models/user.model');
const PetModel = require('../models/pet.model');
const router = express.Router();


//orden es importante
router.use(checkJwt) //primero porque decodifica token
router.use(checkAdmin) //revisa admin

router.delete('/deletePet', async (req, res) => {
    try {
        const deletePets = await deletePet(req.body.id);
        res.status(200).send('La mascota ha sido eliminada');
    } catch (err) {
        res.status(501).send(err.message);
    }
});

router.get('/getAllPets', async (req, res) => {
    try {
        const allPets = await PetModel.find().sort([['created_at', 1]]);
        res.status(200).send(allPets);
    } catch (err) {
        res.status(501).send(err.message);
    }
});


const aDay = (24 * 60 * 60 * 1000)
const aWeek = (24 * 60 * 60 * 1000) * 7
const aMonth = (24 * 60 * 60 * 1000) * 30.44

router.get('/analytics/:theParam', async (req, res) => {
    try {

        const now = new Date();

        let allAdoptedPets = await PetModel.find({ state: 'Adopted', lastAdoptionDate: { $exists: true } });
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
        res.status(501).send(err.message);
    }
});


router.get('/reportPets', async (req, res) => {
    try {
        const allPetsReports = await PetModel.find({
            reportes: { $exists: true, $not: { $size: 0 } },
        });
        res.status(200).send(allPetsReports);

    } catch (err) {
        res.status(501).send(err.message);
    }
});
router.get('/reportUsers', async (req, res) => {
    try {
        const allPetsReports = await UserModel.find({ infracciones: { $exists: true, $not: { $size: 0 } }, });
        res.status(200).send(allPetsReports);
    } catch (err) {
        res.status(501).send(err.message);
    }
});
router.get('/userban', async (req, res) => {
    try {
        const allPetsReports = await UserModel.find({ tipo: 'inhabilitado' });
        res.status(200).send(allPetsReports);
    } catch (err) {
        res.status(501).send(err.message);
    }
});
router.put('/ban', async (req, res) => {
    try {
        const { OwenerEmail } = req.body;
        const userABanear = await UserModel.updateOne({ email: OwenerEmail }, { tipo: 'inhabilitado' });
        res.status(200).send({ message: 'Se ha baneado a un usuario ', user: userABanear });
    } catch (err) {
        res.status(501).send(err.message);
    }
});

router.put('/desbanear', async (req, res) => {
    try {
        const { OwenerEmail } = req.body;
        const userAdesBanear = await UserModel.updateOne({ email: OwenerEmail }, { tipo: 'User' });
        res.status(200).send({ message: 'Se ha desbaneado a un usuario ', user: userAdesBanear });
    } catch (err) {
        res.status(501).send(err.message);
    }
});

router.get('/checkPetsByEmail', async (req, res) => {
    try {
        const { OwnerEmail } = req.body;
        const findPets = await PetModel.find({ owner: OwnerEmail });
        if (findPets) {
            res.status(200).send(findPets)
        } else {
            res.status(401).send('No tenemos mascotas con ese email');
        }
    } catch (err) {
        res.status(501).send(err.message);
    }
});

router.put('/admin', checkJwt, async (req, res) => {
  try {
    const { OwenerEmail } = req.body;
    const checkUser = await UserModel.findOne({
      _email: req.user.email,
      tipo: 'Admin',
    });
    if (checkUser) {
      const userAAdmin = await UserModel.updateOne(
        {email:OwenerEmail},
        { tipo: 'Admin' }
      );   
      res.status(200).send("El usuario ahora es admin")
     } else {
      res.status(401).send({error:'No tienes autorización para hacer admin a esta persona'});
    }
  } catch (err) {
    res.status(501).send({ error: err.message });
  }
});

module.exports = router;
