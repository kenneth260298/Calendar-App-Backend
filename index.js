const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();
//Create server
const app = express();

//PORT
const PORT = process.env.PORT;

//DB
dbConnection();

//CORS  
app.use(cors());

//Public Directory
app.use(express.static('public'));

//Read and parse body
app.use(express.json());

//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//Listen request
app.listen(PORT, () => {
    console.log(`Server Running -> ${PORT}`)
});