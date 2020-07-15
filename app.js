const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const Category = require('./routes/category');
const Product = require('./routes/product');
const Store = require('./routes/store');

app.set('port', 3008);
app.use(express.json());
app.use(bodyParser.json())

// Routes
app.use('/category', Category);
app.use('/product', Product);
app.use('/store', Store);

app.get('/', (req, res) => {
    res.send('Index');
});

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
