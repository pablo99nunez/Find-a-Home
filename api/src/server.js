// IMPORTS
const express = require('express');
const render = require('express-react-views');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors')
// read .env file
require('dotenv').config();
const mongoose = require('mongoose');

const routes = require('./routes');
//-----------------------------
/* eslint no-return-await: 0 */
mongoose.set('strictQuery', true)
const DATABASE_URL = process.env.DATABASE_URL? process.env.DATABASE_URL: 'mongodb://localhost:27017';
const DATABASE_NAME = process.env.DATABASE_NAME || 'my-tutorial-db';


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(DATABASE_URL+ '/' + DATABASE_NAME);
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


const timeStamp = (req) => {
    const date = new Date();
    const currentTimeStamp = date.getTime();
    console.log(`${currentTimeStamp} - ${req.protocol}//${req.headers.host}${req.originalUrl}`);
};

const create = async () => {

    const app = express();
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.set('views', path.join(__dirname, './views'));
    app.set('view engine', 'jsx');
    app.engine(
        'jsx',
        render.createEngine({ beautify: true })
    );
    app.use(routes)

    
   
//     // Display form and table
// app.get('/', async (req, res) => {
//     timeStamp(req);
       
//     // return react front-end
//     res.redirect('/admin')
//   });

//     // instead of 404 - just return home page
//     app.get('*', (req, res) => {
//         timeStamp(req);

//        res.status(400).send(error)
//     });

    return app;
};

module.exports = {
    create
};
