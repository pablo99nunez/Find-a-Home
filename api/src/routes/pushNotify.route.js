const express = require('express');

const router = express.Router();

const axios = require('axios');

router.post("/push-notify", async (req, res) => {
	const { title, body, token } = req.body;

	try {
		const response = await axios.post("https://exp.host/--/api/v2/push/send", {
			to: token,
			title,
			body
		}, {
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
		console.error("⚠️ Error -> 🚨 Routes -> 🔔/push-notify: " + error.message);
		res.status(500).json({ error: "Internal server error" });
	}
});


module.exports = router;
