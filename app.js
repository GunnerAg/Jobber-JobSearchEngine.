
require('dotenv').config();
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');



mongoose
  .connect('mongodb://localhost/Jobber', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// default value for title local
app.locals.title = '';

//COOKIES SETUP
app.use(cookieParser());

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
 
app.use(session({
  secret: 'my-first-car',
  cookie: {
    maxAge: 1000*60*60*24// 1day // in milliseconds 
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 60*60*24  // 1 day // value in seconds
  })
}));


app.use(function(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});


const indexRouter = require('./routes/index.routes');
app.use('/', indexRouter);

const authRouter = require('./routes/auth.routes');
app.use('/', authRouter);

const employeeRouter = require('./routes/employee.routes');
app.use('/', employeeRouter);

const employerRouter = require('./routes/employer.routes');
app.use('/', employerRouter);

// const userRouter = require('./routes/users.routes');
// app.use('/', userRouter);

// if (req.session.loggedInUser && req.session.loggedInUser.type === 'employee' ){
//   const employeeRouter = require('./routes/employee.routes');
// app.use('/', employeeRouter);
// }
// if (req.session.loggedInUser && req.session.loggedInUser.type === 'employer'  ){
//   const employerRouter = require('./routes/employer.routes');
// app.use('/', employerRouter);
// }




module.exports = app;


