const express = require('express');
const router = express.Router();
const {  requiresAuth } = require('express-openid-connect');


// Anyone can access the homepage
router.get('/', (req, res) => {
  res.send('<a href="/admin">Admin Section</a>');
});

// requiresAuth checks authentication.
router.get('/admin', requiresAuth(), (req, res) =>
  res.send(`Hello ${req.oidc.user.sub}, this is the admin section.`)
);
module.exports = router;