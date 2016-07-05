var app = angular.module('RealEstateApp', ['ngFileUpload']),
          oneDay         = 1000 * 60 * 60 * 24,
          roundingFactor = 100;

addDays = function(date, days) {
        var result = new Date(date);
        result.setDate(date.getDate() + days);
        return result;
    };
