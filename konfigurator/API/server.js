const express = require('express');
const res = require('express/lib/response');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

const logger = (req, res, next) => {
    console.log('URL: ', req.originalUrl);
    next();
};

app.set('view engine', 'ejs');
app.use(logger);

const productsRoutes = require('./routes/products');

app.use('/products', productsRoutes);

app.listen(9000);
