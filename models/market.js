var mongoose = require ('mongoose'),
    Schema   = mongoose.Schema;


    var marketSchema = new Schema({
//Input Fields
      projectName:    { type: String, required: true },
      address:        { type: String, required: true },
      zipCode:        { type: String, required: true },
      projectType:    { type: String, required: true },
      projectSize:    { type: Number, required: true },
      projectUnits:   { type: String, required: true },
      occupancy:      { type: Number },
      tenantName:     { type: String },
      tenantType:     { type: String, required: true },
      leasedUnits:    { type: Number },
      leaseSigned:    { type: Date },
      rentPSF:        { type: Number, required: true },
      annualBumps:    { type: Number, required: true },
      term:           { type: Number, required: true },
      freeRent:       { type: Number, required: true },
      allowancesPsf:  { type: Number, required: true },
      commission:     { type: Number, required: true },
      source:         { type: String, required: true },
      notes:          { type: String },
//Field in Detail
      toModel:        { type: Boolean },
//system generated
      scenarioID:     { type: Schema.Types.ObjectId,
                    ref: 'Scenario',
                    required: true },
      lastUpdated:    { type: Date, required: true },
      lastUpdatedBy:  { type: String, required: true },
      latitude:       { type: String, required: true },
      longitude:      { type: String, required: true },

    });

var Market      = mongoose.model("Market", marketSchema);

module.exports = Market;
