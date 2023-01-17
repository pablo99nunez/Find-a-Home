const express = require('express');
const router = express.Router();
const { checkJwt } = require('../../utils/checktoken');
/* const { requiresAuth } = require('express-openid-connect'); */
const UserModel = require('../../models/user');


// Display form and table
router.get('/', async (req, res) => {


  const initialData = {
    data: [],
    dbStatus: true
  };

  // get all items
  initialData.data = true
    ? await UserModel.find()
    : initialData;

  // return react front-end
  res.render('index', initialData);
});
// Insert row into table
router.post('/', async (req, res) => {


  // insert
  if (req.body && Object.keys(req.body).length > 0) {
    const newItem = [req.body];
    UserModel.create(newItem, function (err, newItem) {
      if (err) {
        console.log(err.message);
        return res.status(501).send({ error: err.message })
      }
      else {
        // saved!
        res.redirect('/superadmin/');
      };
    });
  } else {
    // return react front-end
    res.redirect('/superadmin/');
  }
});
// Delete 1 or all - depending on query string
router.get('/delete', async (req, res) => {

  const docs = req.query && req.query.id ? { _id: req.query.id } : {};
  // delete
  await UserModel.deleteMany(docs);
  res.redirect('/superadmin/');
});




module.exports = router;

