const rateLimit = require("express-rate-limit");
const limit5cada12horas = rateLimit({
    windowMs:  60 * 60 * 1000 * 12, // 12 hours
    max: 5, // limit each IP to 5 requests per windowMs
    message: "Demaciadas peticiones, por favor purebe nuevamente en 12 horas"
  });
  const limit1cada30minutos = rateLimit({
    windowMs:  60 * 60 * 1000 * 0.5, // 30 minutos
    max: 1, // limit each IP to 1 requests per windowMs
    message: "Demaciadas peticiones, por favor purebe nuevamente en 12 horas"
  });
  const limit5cada30minutos = rateLimit({
    windowMs:  30*30 * 1000 , // 30 minutos
    max: 5, // limit each IP to 1 requests per windowMs
    message: "Demaciadas peticiones 5 cada 30, por favor purebe nuevamente en 30 minutos"
  });
  const limitTest = rateLimit({
    windowMs:  2 * 60 * 1000, // 2 minutos
    max: 20, // limit each IP to 20 reques ts per windowMs
    message: "Demaciadas peticiones, por favor purebe nuevamente en 2 minutos"
  });
  const limit2cada1minuto = rateLimit({
    windowMs:  1 * 60 * 1000, // 2 minutos
    max: 2, // limit each IP to 20 reques ts per windowMs
    message: "Demaciadas peticiones 2 cada 1 min, por favor purebe nuevamente en 2 minutos"
  });
  const globalLimit = rateLimit({
    windowMs:  2 * 60 * 1000 , // 2 min
    max: 50, // limit each IP to 100 requests per windowMs 
    message: "Limite 50 peticiones en margen de 2 minutos, espere 2 minutos"
  });

  module.exports = {
    limitTest,
    limit5cada12horas,
    limit1cada30minutos,
    globalLimit,
    limit5cada30minutos,
    limit2cada1minuto,
};