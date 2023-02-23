const express = require('express');
//agregar mas importaciones de ruta aca:
const userRoute = require('./user.route');
const petRoute = require('./pet.route');
const filtroRoute = require('./filter.route');
const pushNotify = require('./pushNotify.route');
const adminRoute = require('./admin.route');
const mercadopago = require('./mercadopago.route');
const { route } = require('./user.route');

const router = express.Router();
//agregar middleware de rutas aca:
router.use('/api/user', userRoute);
router.use('/api/pet', petRoute);
router.use('/api/pet/filter', filtroRoute);
router.use('/api/send', pushNotify);
router.use('/api/admin', adminRoute);
router.use('/api/donation', mercadopago);

module.exports = router;
