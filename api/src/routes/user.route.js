const express = require('express');
const { findUser, updateUser, findAllUsers, createNewUser } = require('../controllers/userController');
const router = express.Router();
const UserModel = require('../models/user');

router.get('/profile',(req, res) => {
  try {
    const userEmail = req.body.email
    if(userEmail) {
      const user = findUser(userEmail)}
      res.send(user)
  } catch (error) {
    res.status(501).send({error: error.message})
  }
})

router.get('/', (req,res) => {
  try {
    const user = req.query
    if(!user) user = {}
    findAllUsers(user)
  } catch (error) {
    res.status(501).send({error: error.message})
  }
})

router.post('/', (req,res) => {
  try {
    const newUser = req.body
    createNewUser(newUser)
  } catch (error) {
    res.status(501).send({error: error.message})
  }
})

router.put('/',(req, res) => {
  try{
    const user = req.body
    const updatedUser = updateUser(user)
  res.send({message: 'usuario editado', payload: updatedUser });
} catch(err){
  res.status(501).send({error: err.message})
}
});





module.exports = router;
