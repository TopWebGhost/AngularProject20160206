var express    = require('express'),
    router     = express.Router(),
    User    = require('../models/user.js'),
    multer    = require('multer'),
    upload    = multer({dest:"./uploads"}),
    config = require('../config');

//GET ALL Users
router.get('/', function(req, res){
  User.find({}, function(err, users){
    res.json(users);
  });
});

//CREATE user
router.post('/', function (req, res) {
   addUser(req.body, function () {
       User.find({}, function(err, users){
           res.json(users);
       });
   });
});

//login user
router.post('/login', function (req, res) {
    var userInfo = {loggedIn: false};
    User.findOne({email: req.body.email}, function(err, user){
       if (err) {
           console.log('Error in login api: ' + err);
           res.json({error: err});
       } else {
           if (user) {
               User.comparePassword(req.body.password, user.password, function(result) {
                   if (result.matched) {
                       req.session.user = user;
                       userInfo = {
                            loggedIn: true,
                            user: user
                       };
                   } else {
                       userInfo.loginError = "Invalid Password";
                   }
                   res.json(userInfo);
               });
           } else {
               userInfo.loginError = "Invalid email";
               res.json(userInfo);
           }
       }
    });
});

router.get('/logout', function(req, res){
    delete req.session.user;
    res.json({done: true});
});

router.get('/validateSession', function (req, res) {
    console.log('session user: ' + req.session.user);
    var loggedIn = !!req.session.user;
    userInfo = {
        loggedIn: loggedIn,
        user: req.session.user
    };
    res.json(userInfo);
});


function createDefaultUsers () {
    User.remove({}, function(err, data){
        var users = config.defaultUsers;
        for (var k = 0; k < users.length; k++) {
            addUser(users[k]);
        }
    });
}

function addUser (userData, callback) {
    User.encryptPassword(userData.password.toString(), function(err, encPassword){
        userData.password = encPassword;
        User.create(userData, function(err, data){
            if (callback) {
                callback();
            }
        });
    });
}

router.createDefaultUsers = createDefaultUsers;

//export router object
module.exports = router;