// P   = Payment
// PV  = Present Value
// r   = rate per period
// n   = number of periods
//
// P = (r*PV)/(1 - (( 1 + r )^-n) )

var loanAmount          = 50000,
    amoPeriod           = 30,
    fundingDate         = new Date('2015/5/10'),
    term                = 10,
    interestRateSpread  = 450/10000,
    interestRateIndex   = 150/10000,

    interestOnlyStart   = new Date('2015/5/10'),
    interestOnlyEnd     = new Date('2015/5/10'),
    paymentDay          = 5,
    //nice to have
      //payment variablity
    interestRateType    = "fixed", //fixed or floating;
    interestRateCeiling = 500,
    interestRateFloor   = 400,

    //calculateInterestPaymentPerPeriod based on differing period lengths (365vs364)
    //calculatePrincipalPaymentPerPeriod based on differing period lengths (365vs364)

    interestRate = interestRateSpread + interestRateIndex;

calculatePayment = function(){
  payment = ((interestRate) * loanAmount)/(1 - Math.pow( ( 1 + (interestRate) ), - amoPeriod) );
  console.log(payment);
};

calculatePayment();

//http://www.pine-grove.com/online-calculators/simple-interest-calculator.htm
