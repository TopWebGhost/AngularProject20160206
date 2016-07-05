
app.directive('topHeader', ['$window', '$compile', function ($window, $compile) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/shared/Top-Header.html'
    };
}]);
