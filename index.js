const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const { BlobServiceClient } = require('@azure/storage-blob');
const { v1: uuidv1 } = require('uuid');
const dotenv = require('dotenv');
dotenv.config(); // Injecting env variables into process.env

const app = express();
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.set('port', process.env.PORT || 5000);

/* Import modular routes */
const products = require('./routes/products');
const login = require('./auth/auth_jwt');
const upload = require('./routes/upload');
const payment = require('./routes/payment');
const account = require('./routes/account');
const admin = require('./routes/admin');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static('./client/build'));

app.use('/products', products);
app.use('/api', login);
app.use('/document', upload);
app.use('/payment', payment);
app.use('/account', account);
app.use('/admin', admin);

app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`);
});