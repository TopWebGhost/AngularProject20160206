
app.directive('assetToolbar', ['$window', '$compile', function ($window, $compile) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            showdetail: '=showDetail'
        },
        templateUrl: 'templates/assets/Asset-Toolbar.html',
        controller: 'AssetToolbarController',
        controllerAs: 'vm',
        link: function($scope, element, attrs) {
            // Trigger when number of comments changes
            $scope.renderCount = 0;
            $scope.$watch(function() {
                $scope.showToolbar = attrs.showdetail === 'true';

                //Will be used(for height adjustment) later when dynamically comment will be added.
                var commentCount = $(element).find('.comment').length;
                if ($scope.renderCount != commentCount) {
                    $scope.renderCount = commentCount;
                    $scope.$emit("comment-update", commentCount);
                }
            });
        }
    };
}]);
