const express = require('express');

const router = express.Router();

const axios = require('axios');

router.post("/push-notify", async (req, res) => {
	try {
		const { title, body, token } = req.body;
		const sendNotifications = token.map(eachToken => {
			if (eachToken) {
				return {
					to: token,
					title,
					body
				}
			}
		})
		console.log(sendNotifications)
		const response = await axios.post("https://exp.host/--/api/v2/push/send", sendNotifications, {
			headers: {
				'host': 'exp.host',
				'accept': 'application/json',
				'accept-encoding': 'gzip, deflate',
				'content-type': 'application/json'
			}
		});

		console.log(response.data);
		res.status(200).json({ message: "Push notification sent", response: response.data });
	} catch (error) {
		res.status(500).json({ error: "⚠️ Error -> 🚨 Routes -> 🔔/push-notify: " + error.message });
	}
});


module.exports = router;
