const express = require('express');
const { findPet, findAllPets, updatePet } = require('../controllers/petController');
const {findAllUsers} = require("../controllers/userController")
const { checkJwt } = require('../utils/firebase-stuff');
const {deletePet} = require("../controllers/deletePet.js")
const UserModel = require('../models/user.model');
const PetModel = require('../models/pet.model');
const router = express.Router();



router.get('/allPets', checkJwt, async (req, res) => {
    const {id} =  req.user
    try {
        const users = await findAllUsers(id)
        if(users[0].tipo === "Admin"){

      const allPets = await findAllPets({})
      res.send({message: 'Todas las mascotas', payload: allPets})
    }else{
        res.status(501).send("No sos admin")
    }
    } catch (error) {
      res.status(501).send({ error: error.message })
    }
  })

router.delete("/deletePet", checkJwt, async (req, res) =>{
    const {id} =  req.user
    const {idPet} = req.body
    console.log(req.body)
    try{
    const users = await findAllUsers(id)
    if(users[0].tipo === "Admin"){
        
    const deletePets =  await deletePet(idPet)
        res.status(200).send("La mascota ha sido eliminada")
    }
        else{
        res.status(501).send("Necesitas ser admin para eliminar cualquier mascota")       
        }
    }
    catch(err){
        res.status(501).send({ error: err.message })
    
    }
    }
)
router.get("/reportPets", checkJwt, async (req, res) =>{
  try{
const checkUser = await UserModel.findOne({ _email: req.user.email, tipo: "Admin" });
if (checkUser) {
  const allPetsReports = await PetModel.find({ reportes: { $exists: true, $not: {$size: 0} } });
  res.status(200).send(allPetsReports);
} else {
  // El usuario no es un administrador, devuelve un mensaje de error
  res.status(401).send("No tienes autorización para ver la lista de reportados");       
}
}
catch(err){
  res.status(501).send({ error: err.message })

}
})   


  module.exports = router;
