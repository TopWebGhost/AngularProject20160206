var mongoose = require ('mongoose'),
    Schema   = mongoose.Schema;


    var commentSchema = new Schema({
      lastUpdated:      { type: Date, required: true },
      lastUpdatedBy:    { type: String, required: true },
      comment:          { type: String, required: true },
      category:         { type: String },
    });


    var fileSchema = new Schema({

        lastUpdated:    { type: Date, required: true },
        lastUpdatedBy:  { type: String, required: true },
        category:       { type: String, required: true },

        fieldname:      { type: String, required: true },
        originalname:   { type: String, required: true },
        encoding:       { type: String, required: true },
        mimetype:       { type: String, required: true },
        destination:    { type: String, required: true },
        filename:       { type: String, required: true },
        path:           { type: String, required: true },
        size:           { type: Number, required: true },
    });

    var scenarioSchema = new Schema({

      scenarioName:        { type: String },
      scenarioDescription: { type: String },
      purchasePrice:       { type: Number, required: true },
      closingDate:         { type: Date, required: true },
      costOfRenovation:    { type: Number, required: true },
      numberOfPeriods:     { type: Number, required: true },
      lengthOfPeriods:     { type: Number, required: true },
      dateArray:           { type: Array, required: true },
      lastUpdated:         { type: Date, required: true },
      lastUpdatedBy:       { type: String, required: true },
      overviewComment:     { type: String },

      market:              [{ type: Schema.Types.ObjectId, ref: 'Market' }],
      revenues:            [{ type: Schema.Types.ObjectId, ref: 'Revenue' }],
      expenses:            [{ type: Schema.Types.ObjectId, ref: 'Expense' }],
      sales:               [{ type: Schema.Types.ObjectId, ref: 'Sale' }],
      // debt:                [{ type: Schema.Types.ObjectId, ref: 'Market' }],

    });


var assetSchema = new Schema({

  investmentName:     { type: String, required: true },
  ownershipEntityName:{ type: String, required: true },
  previousOwnerName:  { type: String },
  propertyType:       { type: String, required: true },
  yearBuilt:          { type: Number },
  yearRenovated:      { type: Number },
  address:            { type: String, required: true },
  zipCode:            { type: String, required: true },
// System Generated
  dateArray:          { type: Array, required: true },
  lastUpdated:        { type: Date, required: true },
  lastUpdatedBy:      { type: String, required: true },
  latitude:           { type: String, required: true },
  longitude:          { type: String, required: true },
//
  comments:           [ commentSchema ],
  files:              [ fileSchema ],
  scenarios:          [ scenarioSchema ],

});

var Comment = mongoose.model("Comment", commentSchema);
var AssetFile = mongoose.model("AssetFile", fileSchema);
var Scenario   = mongoose.model("Scenario", scenarioSchema);
var Asset      = mongoose.model("Asset", assetSchema);

module.exports = Asset;
