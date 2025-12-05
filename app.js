var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require("mongoose");

// ===== SWAGGER SETUP (ĐẶT TRÊN APP) =====
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");
const swaggerDocument = yaml.load("./openapi.yaml");
// =======================================

// load models
require("./models/category");
require("./models/Image");
require("./models/product");
require("./models/cart");
require("./models/review");
require("./models/orderDetail");
require("./models/order");
require("./models/user");

// routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouters = require("./routes/categoryRouter");
var productRouters = require("./routes/productRouter");
var imageRouters = require("./routes/ImageRouter");

var app = express();

// ===== SWAGGER ROUTE (ĐẶT SAU KHI TẠO APP) =====
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// =============================================

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// connect database
mongoose.connect('mongodb+srv://haavatar123_db_user:V7JWcfp0wDN3pBO0@cluster0.yllhbch.mongodb.net/MD20302')
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));

// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/category", categoryRouters);
app.use("/product", productRouters);
app.use("/image", imageRouters);

// catch 404
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
