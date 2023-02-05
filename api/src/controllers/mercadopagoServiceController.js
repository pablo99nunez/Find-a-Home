const axios = require('axios');


class PaymentService {
    async createPayment(cuanto) {
        const url = 'https://api.mercadopago.com/checkout/preferences';

        const body = {
            payer_email: 'test_user_1300485701@testuser.com',
            items: [
                {
                    // id: "item-ID-1234",
                    title: "Mi producto",
                    currency_id: "ARS",
                    picture_url: "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
                    description: "Descripción del Item",
                    // category_id: "art",
                    quantity: 1,
                    unit_price: cuanto
                }
            ],
            back_urls: {
                success: "/success",
                failure: "/failure",
                pending: "/pending"
            }
        }

        const payment = await axios.post (url, body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        })

        return payment.data
    }
}

module.exports = PaymentService