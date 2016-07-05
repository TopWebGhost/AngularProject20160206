var mongoose = require ('mongoose'),
    Schema   = mongoose.Schema;

            var paymentScheduleSchema = new Schema({
              paymentDueDate:   { type: Date, required: true },
              paymentAmount:    { type: Number, required: true },
              assumption:       { type: Boolean, required: true },
            });


        var periodDetailSchema = new Schema({

          periodStart:     { type: Date, required: true },
          periodEnd:       { type: Date, required: true },
          rent:            { type: Number, required: true },
          rentType:        { type: String, required: true },
          commission:      { type: Number, required: true },
          assumption:      { type: Boolean, required: true },
          paymentSchedule: [paymentScheduleSchema],

        });


    var revenueSchema = new Schema({

      tenantName:         { type: String, required: true },
      tenantType:         { type: String, required: true },
      leasedUnits:        { type: Number, required: true },
      leaseSigned:        { type: Date, required: true },
      leaseCommence:      { type: Date, required: true },
      allowancesPsf:      { type: Number, required: true },
      rentDueDate:        { type: Number, required: true },
      rentFrequency:      { type: String, required: true },
      notes:              { type: String },

      scenarioID:     { type: Schema.Types.ObjectId,
                          ref: 'Scenario',
                          required: true },

      lastUpdated:        { type: Date, required: true },
      lastUpdatedBy:      { type: String, required: true },
      periodDetail:       [periodDetailSchema],

    });


var RevenuePaymentSchedule  = mongoose.model("RevenuePaymentSchedule", paymentScheduleSchema);
var PeriodDetail            = mongoose.model("PeriodDetail", periodDetailSchema);
var Revenue                 = mongoose.model("Revenue", revenueSchema);

module.exports = Revenue;
