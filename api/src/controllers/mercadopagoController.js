
class PaymentController {
    constructor (subscriptionService) {
        this.subscriptionService = subscriptionService
    }

    async getPaymentLink (req, res) {
        try {
            const payment = await this.subscriptionService.createPayment();
            return res.json(payment)
        } catch (err) {
            console.log(err);
            return res
                .status(500)
                .json({error: true, msg: 'Failed to create payment'})
        }
    }
}

module.exports = PaymentController