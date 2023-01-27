const server = require('./server'); //se mete en el contexto de ejecucion de server.js
//luego de que termine de ejecutarse, sigue a la siguiente linea
//crea una constante port
const port = process.env.PORT || 8080;
//ejecuta el metodo .create() que pertenese a express (server.js exporta app)
server.create()
.then(app => {
    app.listen(port, () => {
        console.log(`Server has started on port ${port}!`);
    }); 
}).catch(err => console.log(err));