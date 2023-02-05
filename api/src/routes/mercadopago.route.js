const express = require('express');
const router = express.Router();

const PaymentController = require('../controllers/mercadopagoController')
const PaymentService = require('../controllers/mercadopagoServiceController')

const PaymentInstance = new PaymentController(new PaymentService())
/* router.get('/', (req, res) => {
    return res.json({
        '/payment': 'Generates a payment link'
    })
})
*/
router.get('/', async (req, res) => {
    let { cantidad } = req.query;
    console.log(cantidad);
    cantidad = parseInt(cantidad)
    console.log('luego de parseint',cantidad);
    if (isNaN(cantidad) || cantidad <= 50) {
        res.status(501).send({ error: 'Debe ingresar un valor numérico mayor a 50 pe' })
    } else {
        await PaymentInstance.getPaymentLink(req, res, parseInt(cantidad));
    }

})

module.exports = router