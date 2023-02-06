const express = require('express');

const router = express.Router();

const axios = require('axios');

const { sendNotifications, saveNotificationsInDB } = require('../controllers/pushController');

router.post("/push-notify", async (req, res) => {
	try {
		//Declaramos los datos que deben llegar por body
		// Si falta algo lanzamos un error
		const { title, body, token, email } = req.body;
		if (!email || !title || !body || !token) throw error;
		// Guardamos las solicitudes en el user que las recibe
		const savedNotification = await saveNotificationsInDB(title, body, email)
		//enviamos notificaciones
		const sentNotifications = await sendNotifications(token, body, title)
		
		res.status(200).json({ message: "Push notification sent and Notification data saved on the db"});

	} catch (error) {
		res.status(400).json({ error: "⚠️ Error -> 🚨 Routes -> 🔔/push-notify: " + error.message });
	}
});


module.exports = router;
