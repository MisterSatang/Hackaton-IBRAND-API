require('dotenv').config();
require('./config/db').connect();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const auth = require('./middleware/auth');
const factoryModel = require('./routes/factoryRoutes');
const userModel = require('./routes/userRoutes');
const transactionModel = require('./routes/transactionRoutes');
const loginModel = require('./routes/loginRoutes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('tiny'));
// app.use(bodyParser.json());

app.use('/factory', factoryModel);
app.use('/user', userModel);
app.use('/transaction', transactionModel);
app.use('/login', loginModel);
app.use('/welcome', auth, (req, res) => {
    const x = req.user.email;
    console.log(x);
    res.status(200).send('Welcome');
});

app.listen(process.env.PORT, () => {
    console.log('Listening on port 8000');
});