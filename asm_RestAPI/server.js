var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


var mongoose = require('mongoose');
require("./models/account");
require("./models/category");
require("./models/product");
require("./models/bill");
require("./models/billdetails");


var accountRouter = require('./routes/account');
var categoryRouter = require('./routes/category');
var productRouter = require('./routes/product');
var billRouter = require('./routes/bill');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


mongoose.connect('mongodb://127.0.0.1:27017/asm_restapi')
    .then(() => console.log('>>>>>> MongoDB connected'))
    .catch(err => console.log('>>>>>> DB Error', err));


app.use('/api/account', accountRouter);
app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);
app.use('/api/bill', billRouter);


app.use(function (req, res, next) {
    next(createError(404));
});


app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        status: false,
        message: err.message
    });
});

app.listen(5000, function () {
    console.log(">>>>>> Server running on port 5000");
});

module.exports = app;
