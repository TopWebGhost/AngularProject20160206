var express    = require('express'),
    router     = express.Router(),
    Expense    = require('../models/expense.js'),
    multer    = require('multer'),
    upload    = multer({dest:"./uploads"});

//GET ALL Expenses
router.get('/', function(req, res){
  Expense.find({}, function(err, expenses){
    res.json(expenses);
  });
});

//CREATE Expense
router.post('/', function(req, res){
  Expense.create(req.body, function(err, data){
    console.log(err);
    console.log(data);
     Expense.find({}, function(err, expenses){
       res.json(expenses);
     });
   });
});


//export router object
module.exports = router;
