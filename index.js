const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const baseURL = '/api/v1';

const PORT = 8000;

//database configuration
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//Routes
const TaskRoutes = require('./routes/task');
const UserRoutes = require('./routes/user');

const server = express();
server.use( cors() );
server.use( bodyParser.json() );
server.use( morgan('dev') );
server.use( helmet() );

server.post('/', ( request, response ) => {
    response.status(200).send(`Welcome to Express App`);
});

server.use( `${baseURL}/tasks`, TaskRoutes );
server.use( `${baseURL}/users`, UserRoutes );

server.listen( PORT, () => { console.log(`Server currently running on port ${PORT}`)});

