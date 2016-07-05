var mongoose = require ('mongoose'),
    Schema   = mongoose.Schema;

var expensePeriodSchema = new Schema({
  periodDueDate:      { type: Date, required: true },
  periodAmount:       { type: Number, required: true },
});

var expenseSchema = new Schema({
  lastUpdated:         { type: String },
  lastUpdatedBy:       { type: String },
  //categorization
  expenseCategory:     { type: String },
  expensesSubCategory: { type: String },
  //assumptions
  expenseStart:        { type: Date },
  expenseInitalAmount: { type: Number },
  //repeat every [x] days
  expenseRepeat:       { type: Number },
  expenseFixedVariable:{ type: String },
  //forecast
  expenseYoYChange:    { type: Number },
  expenseSpikeOnDate:  { type: Date },
  expenseSpikeEndDate: { type: Date },
  expenseSpike:        { type: Number },
  //period stroage
  expenseArray:        [expensePeriodSchema],

  investmentID:       { type:     Schema.Types.ObjectId,
                        ref:      'Investment',
                        required: true }
});

var ExpensePeriods = mongoose.model("ExpensePeriods", expensePeriodSchema);
var Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
