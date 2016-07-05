var mongoose = require ('mongoose'),
    Schema   = mongoose.Schema;

        var saleCompsSchema = new Schema({

          projectName: { type: String },
          address:     { type: String, required: true },
          zipCode:     { type: String, required: true },
          projectType: { type: String, required: true },
          projectSize: { type: Number, required: true },
          projectUnits:{ type: String, required: true },
          occupancy:   { type: Number },
          noi:         { type: Number, required: true },
          seller:      { type: String },
          saleDate:    { type: Date, required: true },
          broker:      { type: String },
          sources:     { type: String, required: true },
          notes:       { type: String },

        });


    var saleSchema = new Schema({

      saleDate:       { type: Date, required: true },
      salesCosts:     { type: Number, required: true },
      capRate:        { type: Number, required: true },

      scenarioID:     { type: Schema.Types.ObjectId,
                          ref: 'Scenario',
                          required: true },

      lastUpdated:    { type: Date, required: true },
      lastUpdatedBy:  { type: String, required: true },
      comps:          [ saleCompsSchema ],

    });

var SaleComps            = mongoose.model("SaleComps", saleCompsSchema);
var Sale                 = mongoose.model("Sale", saleSchema);

module.exports = Sale;
