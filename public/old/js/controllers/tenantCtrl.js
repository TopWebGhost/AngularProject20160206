app.controller('TenantController', ['$http','$scope', function($http,$scope){
  var controller = this;

//creates a new tenant and passes values from the ng-model to the investments controller
  this.addTenant = function(){
    $http.post('/tenants', {
      //pass values here name: this.name,
      tenantName:     this.name,
      units:          this.units,
      rentDueDay:     this.rentDueDay,
      rentFrequency:  this.rentFrequency,
      investmentID:   $scope.$parent.investment._id,

    }).then(function(data){
        var tenantID = data.data[data.data.length-1]._id;

        $http.post('/investments/'+$scope.$parent.investment._id, {
          //pass values here name: this.name,
          tenantID: tenantID
        });

        var tenantsArray             = $scope.$parent.investment.tenants,
            newTenant                = data.data[data.data.length - 1];

            tenantsArray.push(newTenant);
        });

  };

  //creates new rent period
  this.createPeriod = function(tenant){
    // console.log(this);
    // console.log(tenant);
    $http.post('/tenants/addRentPeriod/'+tenant._id,{
      startDate:    this.startDate,
      endDate:      this.endDate,
      rentAmount:   this.rentAmount,
      rentType:     this.rentType,
      commission:   this.commission,
      rentPeriods: controller.createRentPeriodArray(this.startDate,this.endDate,this.rentAmount,tenant.units,this.rentType,tenant.rentFrequency,tenant.rentDueDay)
    }).then(function(data){
      //pushes new rent period to DOM
      var investmentArray      = $scope.$parent.investment.tenants,
          currentTenantID      = data.data._id,
          lengthOfRentsArray   = data.data.rents.length,
          mostRecentRentPeriod = data.data.rents[lengthOfRentsArray-1];

      for (var i = 0; i < investmentArray.length; i++) {
      if(investmentArray[i]._id === currentTenantID){
          investmentArray[i].rents.push(mostRecentRentPeriod);
        }
      }
    });
  };

  this.calculateMonthlyRentAmount = function(rentAmount, rentType, units){
    var periodRentAmount = 0;

    if(rentType === "PSF/Year"){
      periodRentAmount = Math.round( ( rentAmount / 12 ) * units );
      // console.log(rentAmount/roundingFactor);
    }else if (rentType === "PSF/Month") {
      periodRentAmount = Math.round( rentAmount * units );
      // console.log(rentAmount/roundingFactor);
    }else{
        periodRentAmount = rentAmount;
    }
    return periodRentAmount;

  };

  this.createRentPeriodArray = function(startDate, endDate, rentAmount, units, rentType, rentFrequency, rentDueDay){
    var rentPeriods       = [],
        periodRentAmount  = controller.calculateMonthlyRentAmount(rentAmount,rentType,units);

    determineNumberOfRentPeriods = function(rentDueDay){
      var firstDueDate    = new Date(startDate.getTime()),
          lastDueDate     = new Date(endDate.getTime());

      firstDueDate.setDate(rentDueDay);
      lastDueDate.setDate(rentDueDay);

      if(rentFrequency === "Custom" && startDate.getTime() === endDate.getTime()){
          console.log('custom');
      }else if (rentFrequency === "RecurringMonthly") {
          //firstDueDate is before periodStart &&
          //lastDueDate is before or equal to periodEnd
          //RETURN: difference between months minus 1 and month after firstDueDate
          if( firstDueDate.getTime() < startDate.getTime() &&
              lastDueDate.getTime() <= endDate.getTime() ){
              console.log("1) firstDueDate is before periodStart lastDueDate is before or equal to periodEnd");
              console.log("firstDueDate : "+firstDueDate);
              console.log("startDate : "+startDate);
              console.log("lastDueDate : "+lastDueDate);
              console.log("endDate : "+endDate);
              firstDueDate.setMonth( firstDueDate.getMonth() + 1 );
              console.log("--------reset dates-------");
              console.log("startDate : "+startDate);
              console.log("firstDueDate : "+firstDueDate);
              console.log("lastDueDate : "+lastDueDate);
              console.log("endDate : "+endDate);
              calculateNumberOfRentPeriods( firstDueDate, lastDueDate );

          }
          //firstDueDate is after or equal to periodStart
          //lastDueDate is after to periodEnd
          //RETURN: difference between months minus 1
          else if( firstDueDate.getTime() >= startDate.getTime() &&
                    lastDueDate.getTime() > endDate.getTime() ){
                    console.log("2) firstDueDate is after or equal to periodStart lastDueDate is after to periodEnd");
                    console.log("startDate : "+startDate);
                    console.log("firstDueDate : "+firstDueDate);
                    console.log("endDate : "+endDate);
                    console.log("lastDueDate : "+lastDueDate);
                    lastDueDate.setMonth( lastDueDate.getMonth() - 1 );
                    console.log("--------reset dates-------");
                    console.log("startDate : "+startDate);
                    console.log("firstDueDate : "+firstDueDate);
                    console.log("lastDueDate : "+lastDueDate);
                    console.log("endDate : "+endDate);
                    calculateNumberOfRentPeriods( firstDueDate, lastDueDate );

          }
          //firstDueDate is after or equal to periodStart
          //lastDueDate before or equal to periodEnd
          //RETURN: difference between months
          else if ( firstDueDate.getTime() >= startDate.getTime() &&
                    lastDueDate.getTime() <= endDate.getTime() ) {
                    console.log("3) firstDueDate is after or equal to periodStart lastDueDate before or equal to periodEnd");
                    console.log("startDate : "+startDate);
                    console.log("firstDueDate : "+firstDueDate);
                    console.log("lastDueDate : "+lastDueDate);
                    console.log("endDate : "+endDate);
                    calculateNumberOfRentPeriods( firstDueDate, lastDueDate );

        }
        //firstDueDate is before periodStart
        //lastDueDate is after periodEnd
        //RETURN: difference between months minus 2
          else if ( firstDueDate.getTime() < startDate.getTime() &&
                    lastDueDate.getTime() > endDate.getTime() ) {
                      console.log("4) firstDueDate is before periodStart lastDueDate is after periodEnd");
                      console.log("firstDueDate : "+firstDueDate);
                      console.log("startDate : "+startDate);
                      console.log("endDate : "+endDate);
                      console.log("lastDueDate : "+lastDueDate);
                      firstDueDate.setMonth( firstDueDate.getMonth() + 1 );
                      lastDueDate.setMonth( lastDueDate.getMonth() - 1 );
                      console.log("--------reset dates-------");
                      console.log("startDate : "+startDate);
                      console.log("firstDueDate : "+firstDueDate);
                      console.log("lastDueDate : "+lastDueDate);
                      console.log("endDate : "+endDate);
                      calculateNumberOfRentPeriods( firstDueDate, lastDueDate );
        }

      }
    };

    calculateNumberOfRentPeriods = function(firstDueDate,lastDueDate){
      var firstDueDateYear   = firstDueDate.getFullYear(),
          lastDueDateYear     = lastDueDate.getFullYear(),
          firstDueDateMonth  = firstDueDate.getMonth(),
          lastDueDateMonth    = lastDueDate.getMonth(),
          numberOfMonths  = 0;

          console.log('calculateNumberOfRentPeriods running');

      if(firstDueDateMonth===0){ //Have to take into account that javascript months are zero based
        firstDueDateMonth++;
        lastDueDateMonth++;
      }

      numberOfPaymentsInPeriod = (lastDueDateYear - firstDueDateYear) * 12 + (lastDueDateMonth - firstDueDateMonth) + 1;

      createRentPeriodArray(numberOfPaymentsInPeriod, firstDueDate);
    };

    createRentPeriodArray = function(numberOfPaymentsInPeriod, firstDueDate, rentAmount){

      for (var i = 0; i < numberOfPaymentsInPeriod; i++) {
        var periodDueDate = new Date( firstDueDate.getTime() );
            periodDueDate.setMonth( firstDueDate.getMonth() +i );
            rentPeriods.push({
              periodDueDate:   periodDueDate,
              periodAmount:    periodRentAmount,
              assumption:      'placeholder'
            });
      }
      //  console.log(rentPeriods.length);
      //  console.log(rentPeriods);
    };

    determineNumberOfRentPeriods(rentDueDay);
    return rentPeriods;
  };

}]);
