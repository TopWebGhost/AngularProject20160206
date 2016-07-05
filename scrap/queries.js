Tenant

db.tenants.aggregate(
  [
    {$match: { investmentID: ObjectId("566b456bee4e4ccf2636318c") } },
    {$unwind: "$rents"},
    {$unwind: "$rents.rentPeriods"},
    {$match: {$and: [
      { 'rents.rentPeriods.periodDueDate': {$gte: ISODate("2016-01-05T05:00:00Z")} },
      { 'rents.rentPeriods.periodDueDate': {$lte: ISODate("2016-01-05T05:00:00Z")} }
      ] }
    },
    { $group: { _id: null, totalRent: { $sum: "$rents.rentPeriods.periodAmount" } } }
]);




db.tenants.aggregate(
  [
    {$match: { investmentID: ObjectId("566b45efee4e4ccf2636318e") } },
    {$unwind: "$rents"},
    {$match: {$and: [
      { 'rents.startDate': {$gte: ISODate("2015-12-01T05:00:00Z")} },
      { 'rents.endDate': {$lte: ISODate("2015-12-31T05:00:00Z")} }
      ] }
    },
    { $group: { _id: null, totalRent: { $sum: "$rents.rentAmount" } } }
]);


, function(err, results){
    console.log(results);
  }
