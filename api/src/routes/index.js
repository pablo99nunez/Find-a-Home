const express = require('express');
//agregar mas importaciones de ruta aca:
const userRoute = require('./user.route');
const petRoute = require('./pet.route');
const filtroRoute = require('./filtro.route');


const router = express.Router();
//agregar middleware de rutas aca:
router.use('/user',userRoute)
router.use('/pet',petRoute)
router.use('/filtro',filtroRoute)


module.exports = router;
