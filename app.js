var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ConnectDb = require('./Db/Db');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usersApi');
var params_route = require('./routes/ChatbotUiApi');
var config_route = require('./routes/chatbotConfig');
var login_route = require('./routes/login');
var signup_route = require('./routes/signup');
var bodyParser = require('body-parser')

const URL = require('./constants');
var app = express();
var msgRouter = require('./routes/messagesApi')
const cors = require('cors');
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//connect to db
ConnectDb(URL);
app.use('/', usersRouter);
app.use('/ParamsApi', params_route);
app.use('/user', msgRouter);
app.use('/client/dashboard', config_route);
app.use('/client/login', login_route);
app.use('/client/signup',signup_route);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
