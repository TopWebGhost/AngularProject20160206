    //pulled from tenant
var marketTenantType         = "major",
    inPlaceLeaseEndDate      = new Date("12/31/2015"),
    tenantUnits              = 2500,
    //market assumptions pulled from Investment Table based on marketTenantType
    marketDaysToLeaseUp      = 25, //days
    marketTIs                = 15,
    marketLeasingCommissions = 3,
    marketRent               = 25,
    marketTermDays           = 365*2,
    marketRentGrowth         = 3/100,
    //investment information
    modelEndDate             = new Date("12/31/2019"),
    lastAssumptionPeriod     = modelEndDate,

    //global
    oneDay         = 1000 * 60 * 60 * 24,
    roundingFactor = 100;

    addDays = function(date, days) {
      var result = new Date(date);
      result.setDate(date.getDate() + days);
      return result;
    };

    //figure out how many times to roll over space
      //difference in days between (inPlaceLeaseEndDate + marketDaysToLeaseUp and modelEndDate+12months) / marketTermDays rounded up?

    secondGenLeaseStartDate = addDays(inPlaceLeaseEndDate, marketDaysToLeaseUp);
    lastAssumptionPeriod.setMonth( modelEndDate.getMonth() + 12 );

    numberOfTurnOverPeriods =  Math.ceil( ( ( lastAssumptionPeriod - secondGenLeaseStartDate ) / oneDay ) / ( marketDaysToLeaseUp + marketTermDays ) );

    console.log(numberOfTurnOverPeriods);

    console.log(lastAssumptionPeriod);

    //need to loop over the rent periods in that turn over period
    //need to know start of period and end of period and how many months between

    var i = 1;

    periodStart = addDays( secondGenLeaseStartDate, ( marketDaysToLeaseUp + marketTermDays ) * i );

    periodEnd = addDays( periodStart, marketTermDays );

    console.log(periodStart);
    console.log(periodEnd);

    calculateNumberOfRentPeriods = function(firstDueDate,lastDueDate){
      var firstDueDateYear   = firstDueDate.getFullYear(),
          lastDueDateYear     = lastDueDate.getFullYear(),
          firstDueDateMonth  = firstDueDate.getMonth(),
          lastDueDateMonth    = lastDueDate.getMonth(),
          numberOfMonths  = 0;

      if(firstDueDateMonth===0){ //Have to take into account that javascript months are zero based
        firstDueDateMonth++;
        lastDueDateMonth++;
      }

      numberOfPaymentsInPeriod = (lastDueDateYear - firstDueDateYear) * 12 + (lastDueDateMonth - firstDueDateMonth);
      console.log(numberOfPaymentsInPeriod);
    };

    calculateNumberOfRentPeriods(periodStart,periodEnd);

    createRentPeriodArray = function(numberOfPaymentsInPeriod, firstDueDate){
      var rentPeriods = [];

      for (var i = 0; i < numberOfPaymentsInPeriod; i++) {
        var periodDueDate = new Date(firstDueDate.getTime());
            periodDueDate.setMonth(firstDueDate.getMonth()+i);
            rentPeriods.push({
              periodDueDate:   periodDueDate,
              periodAmount:    calculateMonthlyRentAmount(rentAmount),
              assumption:      'placeholder'
            });
      }
    };


    // [{
    //   totalTIs:
    //   totalLCs:
    //
    //   assumptionPeriod [{
    //     assumptionPeriod:
    //     assumptionPeriodRent: ,
    //   }]
    // }]
