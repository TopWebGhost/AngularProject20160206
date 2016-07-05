var express       = require('express'),
    router        = express.Router(),
    Investment    = require('../models/investment.js'),
    multer        = require('multer'),
    upload        = multer({dest:"./uploads"});

//GET ALL INVESTMENTS
router.get('/', function(req, res){
  Investment.find().populate('tenants').populate('expenses').exec(function(err, investments){
    res.json(investments);
  });
});

//CREATE INVESTMENT
router.post('/', function(req, res){
  // console.log(req.body);
  Investment.create(req.body, function(err, data){
     Investment.find({}, function(err, investments){
      //  console.log(investments);
       res.json(investments);
     });
   });
});

// GET INDIVIDUAL INVESTMENT
router.post('/:_id', function(req, res){

  Investment.findById(req.params._id).exec(function(err, investment){
    //test if request is a new expense
    if(req.body.expenseID !== undefined){
      //test if the expense already exists
      if(investment.expenses.indexOf( req.body.expenseID ) === -1 ){
        investment.expenses.push( req.body.expenseID );
        investment.save();
      }
    //test if request is a new tenant and if the tenant already exitsts
    }else if ( req.body.tenantID !== undefined ) {
      //test if the tenant already exists
      if(investment.tenants.indexOf( req.body.tenantID ) === -1 ){
        investment.tenants.push( req.body.tenantID );
        investment.save();
      }

    }

  });

});

router.post('/addFile/:_id', upload.single('file'), function(req,res){

  var investmentID  = req.params;

  Investment.findOne({ _id:investmentID }, function( err, investment ){
    //if function returns error
    if (err){
      console.log(err);
    }
    //push the rent periods to the rents array withing tenants
    investment.files.push(req.file);
    //callback to handle errors
    investment.save( function (err2) {
      console.log(err2);
      //send response back to angular controller
      res.json(investment);
    });

  });

});


//export router object
module.exports = router;
