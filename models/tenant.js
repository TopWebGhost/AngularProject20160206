var mongoose = require ('mongoose'),
    Schema   = mongoose.Schema;

var rentPeriodSchema = new Schema({
        periodDueDate: { type: Date, required: true },
        periodAmount:  { type: Number, required: true },
        assumption:    { type: Boolean, required: true }
});

var rentSchema = new Schema({
        startDate:  { type: Date, required: true },
        endDate:    { type: Date, required: true },
        rentAmount: { type: Number, required: true },
        rentType:   { type: String, required: true },
        commission: { type: Number, required: true},
        //add assumption here as well?

        rentPeriods: [rentPeriodSchema],
});

var tenantFileSchema = new Schema({
        fieldname:    { type: String, required: true },
        originalname: { type: String, required: true },
        encoding:     { type: String, required: true },
        mimetype:     { type: String, required: true },
        destination:  { type: String, required: true },
        filename:     { type: String, required: true },
        path:         { type: String, required: true },
        size:         { type: Number, required: true },
});

var tenantSchema = new Schema({
        lastUpdated:      { type: String },
        lastUpdatedBy:    { type: String},
        tenantName:       { type: String, required: true},
        units:            { type: Number, required: true},
        rentDueDay:       { type: Number, required: true},
        rentFrequency:    { type: String, required: true},
        // marketTenantType: { type: String, required: true},

        rents:            [rentSchema],
        // rolloverAssump:   [rolloverSchema],
        files:            [tenantFileSchema],

        investmentID:     { type: Schema.Types.ObjectId,
                          ref: 'Investment',
                          required: true },
});

var RentPeriods = mongoose.model("RentPeriods", rentPeriodSchema);
var Rent = mongoose.model("Rent", rentSchema);
var TenantFiles = mongoose.model("TenantFiles", tenantFileSchema);
var Tenant = mongoose.model("Tenant", tenantSchema);

module.exports = Tenant;
