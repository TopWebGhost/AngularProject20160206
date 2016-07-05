var expenseStart = new Date("October 1, 2015"),
    expenseInitalAmount = 5,
    //repeat every [x] days
    expenseRepeat = 30,
    expenseFixedVariable = "Fixed",
    //forecast
    expenseYoYChange = 3,
    expenseSpikeOnDate = new Date("October 12, 2016"),
    expenseSpikeEndDate = new Date("October 12, 2017"),
    expenseSpike = 10,
    //stroage
    expenseArray = [],
    //model stuff
    modelStartDate = new Date("October 12, 2015"),
    numberOfPeriods = 8,
    lengthOfPeriods = 365,
    oneDay = 1000 * 60 * 60 * 24;
    //global
    addDays = function(date, days) {
        var result = new Date(date);
        result.setDate(date.getDate() + days);
        return result;
    };


//loop over the each period and calculate the expense and save each period into date base
//INPUTS FOR CTRL
//modelStartDate, numberOfPeriods, lengthOfPeriods , expenseRepeat, expenseStart, expenseInitalAmount, expenseYoYChange, expenseSpikeOnDate, expenseSpikeEndDate, expenseSpike

createExpenseArray = function (){

  var expenseArray = [],
      modelEndDate = addDays(modelStartDate,(numberOfPeriods * lengthOfPeriods) ),
      numberOfExpenses =  ( Math.round( Math.abs( ( modelEndDate.getTime() - expenseStart.getTime() ) / (oneDay) ) ) ) / expenseRepeat;

for (var i = 0; i < numberOfExpenses; i++) {
  //figure out expense amount and date and push object to expenses array
  var currentExpensePeriod = addDays(expenseStart, i * expenseRepeat),
      //find power to raise YoY growth to
      growthFactor =  Math.floor((Math.round(Math.abs((currentExpensePeriod.getTime() - expenseStart.getTime())/(oneDay))))/365),
      //figure out current period expense. ex. $5.00 * (1.03)^2
      currentExpenseAmount = expenseInitalAmount * Math.pow((1+(expenseYoYChange/100)),growthFactor),
      expensePeriod = {currentExpensePeriod: currentExpensePeriod,
                       currentExpenseAmount: currentExpenseAmount};

      //if statement for expense spike
      if ( currentExpensePeriod >= expenseSpikeOnDate && currentExpensePeriod<= expenseSpikeEndDate) {
        currentExpenseAmount = currentExpenseAmount *(1+(expenseSpike/100));
      }

      console.log("-------"+currentExpensePeriod+"--------");
      console.log("Current Expense Amount: "+currentExpenseAmount);
      console.log("---------------");

      expenseArray.push(expensePeriod);
    }
    console.log(expenseArray);
};

createExpenseArray();


//http://financejs.org/#IRR
//https://gist.github.com/ghalimi/4591338
