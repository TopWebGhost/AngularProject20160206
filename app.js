var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    session = require('express-session'),
    ejs = require('ejs'),
    mongoose = require('mongoose'),
    config = require('./config');

//TODO: Please remove the section to disallow old front-end support
var expressEjsLayouts = require('express-ejs-layouts');
app.set('views', './views');
app.set('view engine','ejs');
app.use(expressEjsLayouts);
app.get('/home', function(req, res){
  res.render('home');
  res.end();
});
//End of old app support stuff

//Please uncomment the section for new front end only
//app.set('view engine', 'html');
//app.set('view options', { layout: false })

//Initialize Packages
app.use(session({
  secret: "iliketurtle",
  resave: true,
  saveUninitialized: false
}));

app.use(bodyParser.json());
//app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
//app.use(bodyParser.urlencoded({ extended: true })); 
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));
mongoose.set('debug', false);

//SETTING CONTROLLERS
var investmentController = require('./controllers/investments.js');
app.use('/investments', investmentController);
var tenantController = require('./controllers/tenants.js');
app.use('/tenants', tenantController);
var expenseController = require('./controllers/expenses.js');
app.use('/expenses', expenseController);
var usersController = require('./controllers/users.js');
app.use('/users', usersController);
usersController.createDefaultUsers();


app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

mongoose.connect(config.mongoUrl);
app.listen(config.appPort, function(){
  console.log("Server is listening on " + config.appPort);
});
