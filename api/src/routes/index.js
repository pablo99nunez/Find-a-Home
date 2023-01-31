const express = require('express');
//agregar mas importaciones de ruta aca:
const userRoute = require('./user.route');
const petRoute = require('./pet.route');
const filtroRoute = require('./filter.route');
const pushNotify = require('./pushNotify.route');

const router = express.Router();
//agregar middleware de rutas aca:
router.use('/user', userRoute)
router.use('/pet', petRoute)
router.use('/pet/filter', filtroRoute)
router.use('/send', pushNotify)

module.exports = router;
