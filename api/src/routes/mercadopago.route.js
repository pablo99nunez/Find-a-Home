const express = require('express');
const router = express.Router();

const PaymentController = require('../controllers/mercadopagoController')
const PaymentService = require('../controllers/mercadopagoServiceController')

const PaymentInstance = new PaymentController(new PaymentService())

router.get('/', (req, res) => {
    return res.json({
        '/payment': 'Generates a payment link'
    })
})

router.get('/payment', (req, res) => {
    PaymentInstance.getPaymentLink(req, res);
})

module.exports = router