require('dotenv').config();
require('./config/db').connect();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


const factoryModel = require('./routes/factoryRoutes');
const userModel = require('./routes/userRoutes');
const transactionModel = require('./routes/transactionRoutes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('tiny'));
// app.use(bodyParser.json());

app.use('/factory', factoryModel);
app.use('/user', userModel);
app.use('/transaction', transactionModel);

app.listen(8000, () => {
    console.log('Listening on port 8000');
});