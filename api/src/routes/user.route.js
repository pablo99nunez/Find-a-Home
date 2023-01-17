const express = require('express');
const { findUser, updateUser, findAllUsers, createNewUser } = require('../controllers/userController');
const router = express.Router();
const UserModel = require('../models/user');

router.get('/profile',async (req, res) => {
  try {
    const userEmail = req.body.email
    if(userEmail) {
      const user = await findUser(userEmail)}
      res.send(user)
  } catch (error) {
    res.status(501).send({error: error.message})
  }
})

router.get('/', async(req,res) => {
  try {
    const user = req.query
    if(!user) user = ''
    const users = await findAllUsers(user)
    res.status(200).send(users)
  } catch (error) {
    res.status(501).send({error: error.message})
  }
})

router.post('/',async (req,res) => {
  try {
    const user = req.body
    const createdUser = await createNewUser(user)
    res.status(200).send(createdUser)
  } catch (error) {
    res.status(501).send({error: error.message})
  }
})

router.put('/', async(req, res) => {
  try{
    const user = req.body
    const updatedUser = await updateUser(user)
  res.status(200).send({message: 'usuario editado', payload: updatedUser });
} catch(err){
  res.status(501).send({error: err.message})
}
});





module.exports = router;
