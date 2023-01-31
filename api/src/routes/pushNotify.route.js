const express = require('express');

const router = express.Router();

router.post("/push-notify", (req, res) => {
	const { title, body, token } = req.body;

	fetch("https://exp.host/--/api/v2/push/send", {
		method: "POST",
		headers: {
			"host": "exp.host",
			"accept": "application/json",
			"accept-encoding": "gzip, deflate",
			"content-type": "application/json"
		},
		body: JSON.stringify({
			to: `ExponentPushToken[${token}]`,
			title,
			body
		})
	})
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		})
		.then(data => {
			console.log(data);
			res.status(200).json({ message: "Push notification sent" });
		})
		.catch(error => {
			console.error(`There was a problem: ${error}`);
			res.status(500).json({ error: "Internal server error" });
		});
});

module.exports = router;