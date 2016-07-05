var startDate     = new Date("January 2, 2016"),
    endDate       = new Date("January 6, 2017"),
    rentAmount    = 125000,
    squareFootage = 1000,
    rentType      = "PSF/Year",
    commission    = 3,
    rentFrequency = "RecurringMonthly",
    rentDueDay   = 5,
    //global variables
    oneDay         = 1000 * 60 * 60 * 24,
    roundingFactor = 100;

createRentPeriodArray = function(startDate, endDate, rentAmount, squareFootage, rentType, rentFrequency, rentDueDay){

  determineNumberOfRentPeriods = function(rentDueDay){
    var firstDueDate    = new Date(startDate.getTime()),
        lastDueDate     = new Date(endDate.getTime());

    firstDueDate.setDate(rentDueDay);
    lastDueDate.setDate(rentDueDay);

    console.log('determineNumberOfRentPeriods running');

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

    if(firstDueDateMonth===0){ //Have to take into account that javascript months are zero based
      firstDueDateMonth++;
      lastDueDateMonth++;
    }

    numberOfPaymentsInPeriod = (lastDueDateYear - firstDueDateYear) * 12 + (lastDueDateMonth - firstDueDateMonth) + 1;

    createRentPeriodArray(numberOfPaymentsInPeriod, firstDueDate);
  };

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
     console.log(rentPeriods.length);
     console.log(rentPeriods);
  };

  calculateMonthlyRentAmount = function(rentAmount){
    if(rentType === "PSF/Year"){
      rentAmount = Math.round( ( rentAmount/12 ) * squareFootage );
      // console.log(rentAmount/roundingFactor);
    }else if (rentType === "PSF/Month") {
      rentAmount = Math.round( rentAmount * squareFootage );
      // console.log(rentAmount/roundingFactor);
    }else{
      // console.log(rentAmount/roundingFactor);
    }
    return rentAmount;
  };

  determineNumberOfRentPeriods(rentDueDay);

};

createRentPeriodArray(startDate, endDate, rentAmount, squareFootage, rentType, rentFrequency, rentDueDay);



testRentPeriodArray = function(){
  for (var i = 1; i < 32; i++) {
    console.log("----------"+i+"-------------");
    determineNumberOfRentPeriods(i);
    console.log("----------"+i+"-------------");
  }
};

testRentPeriodArray();
