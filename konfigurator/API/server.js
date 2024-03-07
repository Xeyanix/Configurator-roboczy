const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

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

// Use the products routes
app.use('/products', productsRoutes);

app.listen(9000, () => {
    console.log('Server is running on port 9000');
});
