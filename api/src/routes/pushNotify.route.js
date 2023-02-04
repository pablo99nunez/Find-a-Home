const express = require('express');

const router = express.Router();

const axios = require('axios');
const { findUser, updateUser } = require('../controllers/userController');
router.post("/push-notify", async (req, res) => {
	let currentNotificationData = []
	try {
		//Declaramos los datos que deben llegar por body
		// Si falta algo lanzamos un error
		const { title, body, token, email } = req.body;
		if (!email || !title || !body || !token) throw error;



		//  El array de tokens es mapeado
		//  a cada token le asignamos un titulo y una descripcion
		//  y guardamos todo como un array de objetos en sendNotifications
		// Sospecho que el principal problema está en los null que se guardan en el array
		//Los null aparecen cuando se usa el emulador, por que expo no detecta un dispositivo real 
		const sendNotifications = token.map(eachToken => {
			if (eachToken) {
				currentNotificationData.push({ title, body })
				return {
					to: token,
					title,
					body,
				}
			}
		})


		// Enviamos la notificacion a la api de expo para que la re-envie a las direcciones que le pasamos con los tokens

		const response = await axios.post("https://exp.host/--/api/v2/push/send", sendNotifications, {
			headers: {
				'host': 'exp.host',
				'accept': 'application/json',
				'accept-encoding': 'gzip, deflate',
				'content-type': 'application/json'
			}
		});



		// Guardamos las solicitudes en el user que las recibe

		const oldUserData = await findUser(email)
		const newUserData = { ...oldUserData, Notifications: [...oldUserData.Notifications, ...currentNotificationData] }
		console.log("newUserData: ", newUserData);
		//                                ↑↑↑↑↑
		//                   Los datos no se están guardando como deberían
		//                   se crea notifications por fuera del modelo
		//                   en vez de modificarse la propiedad ya existente
		const updatedUserData = await updateUser(newUserData, email)



		res.status(200).json({ message: "Push notification sent and Notification data saved on the db", response: response.data });

	} catch (error) {
		res.status(500).json({ error: "⚠️ Error -> 🚨 Routes -> 🔔/push-notify: " + error.message });
	}
});


module.exports = router;
