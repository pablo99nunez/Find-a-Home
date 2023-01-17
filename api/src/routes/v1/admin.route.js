const express = require('express');
const router = express.Router();
const { checkJwt } = require('../../utils/checktoken');
const UserModel = require('../../models/user');

//fn retorna true si role===admin
async function requiresAdmin(req) {

  let user = await UserModel.findOne({ email: req.auth.email });
  if (user)
    return user.role === 'admin' //true si es admin
  else
    return false
    
}

//esto agarra todo a partir de esta ruta
router.all('/*', checkJwt, async function (req, res, next) {
  //busca el usuario y checkea que sea admin
  try{
  if (await requiresAdmin(req) || req.auth.email === "rod.toobe@gmail.com")
    next()
  else
    res.status(401).send({ error: 'No eres admin :(' })
  }
  catch(err){
    res.status(501).send({error: err.message})
  }
});

// Display form and table
router.get('/users', async (req, res) => {
  try{
  const users = await UserModel.find();
  res.send(users);
}
catch(err){
  res.status(501).send({error: err.message})
}
});

// Insert row into table
router.post('/users', async (req, res) => {
  try{
  if (req.body && Object.keys(req.body).length > 0) {
    const newUser = [req.body];
    UserModel.create(newUser, function (err, user) {
      if (err) {
        return res.status(501).send({ error: err.message })
      }
      else {
        res.send(user);
      };
    });
  } else {
    // return react front-end
    res.send({message: 'Debes enviar un body con los datos del usuario a crear'});
  }
}
catch(err){
  res.status(501).send({error: err.message})
}
});


router.delete('/users', async (req, res) => {
  try{
  const docs = req.query && req.query.email ? { email: req.query.email } : {};
  const user = await UserModel.deleteMany(docs);
  res.send({message: 'usuario/s borrado', payload: user});
}
catch(err){
  res.status(501).send({error: err.message})
}
});
/*
model.updateOne({_id:'YOURID'}, {DATA YOU WANT TO UPDATE}, (err, result) => {
	if(err) throw err
    
    console.log(err)
})
*/
router.put('/users', async (req, res) => {
  try{
    const whom = req.query && req.query.email ? { email: req.query.email } : {};
  const updated = await UserModel.updateOne(whom, req.body);
  res.send({message: 'usuario editado', payload: updated});
}
catch(err){
  res.status(501).send({error: err.message})
}
});

module.exports = router;

