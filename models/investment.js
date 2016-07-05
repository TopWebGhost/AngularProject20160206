var mongoose = require ('mongoose'),
    Schema   = mongoose.Schema;

var investmentFileSchema = new Schema({
        fieldname:    { type: String, required: true },
        originalname: { type: String, required: true },
        encoding:     { type: String, required: true },
        mimetype:     { type: String, required: true },
        destination:  { type: String, required: true },
        filename:     { type: String, required: true },
        path:         { type: String, required: true },
        size:         { type: Number, required: true },
});

var investmentSchema = new Schema({
        lastUpdated:            { type: String },
        lastUpdatedBy:          { type: String},
        name:                   { type: String, required: true },
        modelStartDate:         { type: Date, required: true },
        initalInvestmentAmount: { type: Number, required: true },
        numberOfPeriods:        { type: Number, required: true },
        lengthOfPeriods:        { type: Number, required: true },
        dateArray:              [],

        tenants: [{ type: Schema.Types.ObjectId, ref: 'Tenant' }],
        expenses: [{ type: Schema.Types.ObjectId, ref: 'Expense' }],
        files: [investmentFileSchema]
});

var InvestmentFiles = mongoose.model("InvestmentFiles", investmentFileSchema);
var Investment      = mongoose.model("Investment", investmentSchema);

module.exports = Investment;
