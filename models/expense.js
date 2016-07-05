var mongoose = require ('mongoose'),
    Schema   = mongoose.Schema;


        var paymentScheduleSchema = new Schema({
          periodDueDate:      { type: Date, required: true },
          periodAmount:       { type: Number, required: true },
        });

        var expenseCompsSchema = new Schema({

          source: { type: String, required: true },
          date:   { type: Date, required: true },
          amount: { type: Number, required: true },

        });


    var expenseSchema = new Schema({

      category:       { type: String, required: true },
      subCategory:   { type: String, required: true },
      startDate:      { type: Date, required: true },
      onetime:       { type: Boolean, required: true },
      expenseRepeat:  { type: Number, required: true },
      initialAmount:  { type: Number, required: true },
      fixedVariable: { type: String, required: true },
      yOyChange:    { type: Number, required: true },
      spikeStartDate: { type: Date },
      spikeEndDate:   { type: Date },
      spikeAmount:    { type: Number, required: true },
      notes:          { type: String },

      scenarioID:     { type: Schema.Types.ObjectId,
                          ref: 'Scenario',
                          required: true },
      lastUpdated:    { type: Date, required: true },
      lastUpdatedBy:  { type: String, required: true },
      paymentSchedule: [paymentScheduleSchema],
      comps:          [ expenseCompsSchema ],

    });

var ExpensePaymentSchedule  = mongoose.model("ExpensePaymentSchedule", paymentScheduleSchema);
var ExpenseComps            = mongoose.model("ExpenseComps", expenseCompsSchema);
var Expense                 = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
