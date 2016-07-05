app.controller('InvestmentController', ['$http','$scope', function($http,$scope){
  var controller = this;
  $http.get('/investments').then(function(data){
    // console.log(data.data);
    controller.investments = data.data;
    });

//creates a new investment and passes values from the ng-model to the investments controller
  this.addInvestment = function(){
    console.log(controller);
    $http.post('/investments', {
      name: this.name,
      modelStartDate: this.modelStartDate,
      initalInvestmentAmount: this.initalInvestmentAmount,
      numberOfPeriods: this.numberOfPeriods,
      lengthOfPeriods: this.lengthOfPeriods,
      dateArray: controller.createModelDatesArray(this.modelStartDate, this.numberOfPeriods, this.lengthOfPeriods)
    }).then(function(data){
      console.log(data);
      console.log($scope);
      var newInvestment = data.data[data.data - 1];
      controller.investments.push(newInvestment);
      
    });
  };
//should this be done with aggregation???
  this.createModelDatesArray = function(modelStartDate, numberOfPeriods, lengthOfPeriods){
    var dateArray = [modelStartDate];

    for (var i = 0; i < numberOfPeriods; i++) {
      var periodStart = addDays(modelStartDate, (i * lengthOfPeriods)+1),
          periodEnd   = addDays(periodStart, ((i+1) * (lengthOfPeriods)));
          // console.log("--------------");
          // console.log(periodStart);
          // console.log(periodEnd);
          // console.log("--------------");
          dateArray.push([periodStart, periodEnd]);
    }
    return dateArray;
  };

  this.calculateCashFlows = function(investment){
    // console.log(investment);
    console.log("calcing Cash Flows");
    //get route to tenants to get rents
    $http({
      method: 'post',
      url: '/tenants/calculateRents/'+investment._id,
      data: investment
    }).then(function(data){
      console.log(data.data);
      // controller.rentCashFlow = data.data;
      });
    //get route to expenses to get expenses

  };

}]);
