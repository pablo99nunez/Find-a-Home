const express = require('express');
const { findUser, updateUser, findAllUsers, createNewUser } = require('../controllers/userController');
const router = express.Router();
const UserModel = require('../models/user');

router.get('/profile',async (req, res) => {
  try {
    const userEmail = req.body.email
    const user = await findUser(userEmail)
      res.send(user)
  } catch (error) {
    res.status(501).send({error: error.message})
  }
})

router.get('/', async(req,res) => {
  try {
    const filter = req.body
    if(!filter) filter = {}
    const users = await findAllUsers(filter)
    res.status(200).send(users)
  } catch (error) {
    res.status(501).send({error: error.message})
  }
})

router.post('/',async (req,res) => {
  try {
    const {email} = req.body
    const createdUser = await createNewUser(email)
    res.status(200).send(createdUser)
  } catch (error) {
    res.status(501).send({error: error.message})
  }
})

router.put('/profile', async(req, res) => {
  try{
    const user = req.body
    const updatedUser = await updateUser(user)
  res.status(200).send({message: 'usuario editado', payload: updatedUser });
} catch(err){
  res.status(501).send({error: err.message})
}
});





module.exports = router;
