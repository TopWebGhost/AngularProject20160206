var modelStartDate          = new Date("2015-12-14T05:00:00Z"),
    initalInvestmentAmount  = -100000,
    numberOfPeriods         = 120,
    lengthOfPeriods         = 30,
    dateArray               = [],
    oneDay                  = 1000 * 60 * 60 * 24;


addDays = function(date, days) {
        var result = new Date(date);
        result.setDate(date.getDate() + days);
        return result;
    };

createModelDatesArray = function(){
  var currentPeriod = [],
      dateArray = [modelStartDate];

  for (var i = 0; i < numberOfPeriods; i++) {
    var periodStart = addDays(modelStartDate, (i * lengthOfPeriods)+1),
        periodEnd   = addDays(modelStartDate, ((i+1) * (lengthOfPeriods)));
        console.log("--------------");
        console.log(periodStart);
        console.log(periodEnd);
        console.log((periodEnd-periodStart)/oneDay);
        console.log("--------------");
        dateArray.push([periodStart, periodEnd]);
  }
  return dateArray;
};

createModelDatesArray();
