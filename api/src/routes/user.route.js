const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');

router.get('/profile', async (req, res) => {
  try{
  let user = await UserModel.findOne({ email: req.auth.email });
  if (user)
  res.status(200).json({tusDatosSon: user})
  else{
    //crea un usuario nuevo
    const newUser = [{
      name: "Nombre",
      lastName: "Apellido",
      email: req.auth.email,
      email_verified: req.auth.email_verified,
      picture: req.auth.picture,
      // role: undefined
    }]
    
    UserModel.create(newUser, function (err, user) {
      if (err) {
        console.log(err.message);
        return res.status(501).send({ error: err.message })
      }
      else {
        // saved!
        res.status(200).json({usuarioCreado: user})
      };
    });

  }
}
catch(err){
  res.status(501).send({error: err.message})
}
});


router.get('/', async (req, res) => {
  try{
  let user = await UserModel.findOne({ email: req.auth.email });
  res.send(user);
}
catch(err){
  res.status(501).send({error: err.message})
}
});


router.put('/', async (req, res) => {
  try{

  
  const whom = { email: req.auth.email };
  const updated = await UserModel.updateOne(whom, req.body);
  res.send({message: 'usuario editado', payload: updated});
}
catch(err){
  res.status(501).send({error: err.message})
}
});





module.exports = router;
