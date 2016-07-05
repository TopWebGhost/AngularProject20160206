app.controller('ExpenseController', ['$http','$scope', function($http,$scope){
  var controller = this;

//creates a new expense and passes values from the ng-model to the investments controller
  this.addExpense = function(investment){

    $http.post('/expenses', {
      //pass values here
      // name: this.name, etc

      //user info
      // lastUpdated:
      // lastUpdatedBy:
      //categorization
      expenseCategory:     this.expenseCategory,
      expensesSubCategory: this.expensesSubCategory,
      //assumptions
      expenseStart:        this.expenseStart,
      expenseInitalAmount: this.expenseInitalAmount,
      //repeat every [x] days
      expenseRepeat:       this.expenseRepeat,
      expenseFixedVariable:this.expenseFixedVariable,
      //forecast
      expenseYoYChange:    this.expenseYoYChange,
      expenseSpikeOnDate:  this.expenseSpikeOnDate,
      expenseSpikeEndDate:  this.expenseSpikeEndDate,
      expenseSpike:        this.expenseSpike,
      //period storage
      expenseArray:        controller.createExpenseArray(investment.modelStartDate, investment.numberOfPeriods, investment.lengthOfPeriods, this.expenseRepeat, new Date (this.expenseStart), this.expenseInitalAmount, this.expenseYoYChange, this.expenseSpikeOnDate, this.expenseSpikeEndDate, this.expenseSpike),

      investmentID:        $scope.$parent.investment._id,

    }).then(function(data){
      console.log(data);
      console.log($scope);
      var expenseID = data.data[data.data.length-1]._id;
      $http.post('/investments/'+$scope.$parent.investment._id, {
        //pass values here name: this.name,
        expenseID: expenseID
      });

      var expensesArray = $scope.$parent.investment.expenses,
          newExpense    = data.data[data.data.length - 1];

          expensesArray.push(newExpense);

    });
  };

    this.createExpenseArray = function (modelStartDate, numberOfPeriods, lengthOfPeriods , expenseRepeat, expenseStart, expenseInitalAmount, expenseYoYChange, expenseSpikeOnDate, expenseSpikeEndDate, expenseSpike){

      console.log(modelStartDate);
      //have to parse date information and convert it to a date...

    //   addDays = function(date, days) {
    //       console.log(date);
    //           var result = new Date(date);
    //           result.setDate(date.getDate() + days);
    //           return result;
    //       };
    //
    //   var expenseArray = [],
    //       modelEndDate = addDays(modelStartDate,(numberOfPeriods * lengthOfPeriods) ),
    //       numberOfExpenses =  ( Math.round( Math.abs( ( modelEndDate.getTime() - expenseStart.getTime() ) / (oneDay) ) ) ) / expenseRepeat;
    //
    // for (var i = 0; i < numberOfExpenses; i++) {
    //   //figure out expense amount and date and push object to expenses array
    //   var currentExpensePeriod = addDays(expenseStart, i * expenseRepeat),
    //       //find power to raise YoY growth to
    //       growthFactor =  Math.floor((Math.round(Math.abs((currentExpensePeriod.getTime() - expenseStart.getTime())/(oneDay))))/365),
    //       //figure out current period expense. ex. $5.00 * (1.03)^2
    //       currentExpenseAmount = expenseInitalAmount * Math.pow((1+(expenseYoYChange/100)),growthFactor),
    //       expensePeriod = {currentExpensePeriod: currentExpensePeriod,
    //                        currentExpenseAmount: currentExpenseAmount};
    //
    //       //if statement for expense spike
    //       if ( currentExpensePeriod >= expenseSpikeOnDate && currentExpensePeriod<= expenseSpikeEndDate) {
    //         currentExpenseAmount = currentExpenseAmount *(1+(expenseSpike/100));
    //       }
    //
    //       console.log("-------"+currentExpensePeriod+"--------");
    //       console.log("Current Expense Amount: "+currentExpenseAmount);
    //       console.log("---------------");
    //
    //       expenseArray.push(expensePeriod);
    //     }
    //     return expenseArray;
    };


}]);
