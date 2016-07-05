var express   = require('express'),
    router    = express.Router(),
    mongoose  = require ('mongoose'),
    ObjectId  = mongoose.Types.ObjectId,
    Tenant    = require('../models/tenant.js'),
    multer    = require('multer'),
    upload    = multer({dest:"./uploads"});

//GET ALL TENANTS
router.get('/', function(req, res){
  Tenant.find({}, function(err, tenants){
    res.json(tenants);
  });
});

//CREATE TENANT
router.post('/', function(req, res){
  Tenant.create(req.body, function(err, data){
    console.log(err);
    console.log(data);
     Tenant.find({}, function(err, tenants){
       res.json(tenants);
     });
   });
});

//ADD RENT PERIOD
router.post('/addRentPeriod/:_id', function(req,res){
  var tenantID  = req.params;

  Tenant.findOne({ _id:tenantID }, function( err, tenant ){
    //if function returns error
    if (err){
      console.log(err);
    }
    //push the rent periods to the rents array withing tenants
    tenant.rents.push(req.body);
    //callback to handle errors
    tenant.save( function (err2) {
      console.log(err2);
      //send response back to angular controller
      res.json(tenant);
    });

  });

});

router.post('/addFile/:_id', upload.single('file'), function(req,res){

  var tenantID  = req.params;

  Tenant.findOne({ _id:tenantID }, function( err, tenant ){
    //if function returns error
    if (err){
      console.log(err);
    }
    //push the rent periods to the rents array withing tenants
    tenant.files.push(req.file);
    //callback to handle errors
    tenant.save( function (err2) {
      console.log(err2);
      //send response back to angular controller
      res.json(tenant);
    });

  });

});

//AGGREGATE TENANT RENTS
router.post('/calculateRents/:_id', function(req, res){
  console.log(req.params);
  console.log("req.body");
  console.log(req.body);
  console.log("-----------");
  var startDate = new Date("2015-12-01T05:00:00Z"),
      endDate   = new Date("2016-12-31T05:00:00Z"),
      results    = [];

    for (var i = 0; i < 8; i++) {
      Tenant.aggregate(
        [
          {$match: { investmentID: ObjectId(req.params._id) } },
          {$unwind: "$rents"},
          {$unwind: "$rents.rentPeriods"},
          {$match: {$and: [
            //period startDate
            { 'rents.rentPeriods.periodDueDate': { $gte: startDate } },
            //period endDate
            { 'rents.rentPeriods.periodDueDate': { $lte: endDate } }
            ] }
          },
          { $group: { _id: null, totalRent: { $sum: "$rents.rentPeriods.periodAmount" } } }
      ], function(err, result){
          results.push(result[0].totalRent);
          if(results.length == 8){
            res.json(results);
          }
        }
    //ignore this error - Shitty Linter!
      );
    }

});


//export router object
module.exports = router;
