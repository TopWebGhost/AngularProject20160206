app.controller('fileController', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    var controller = this;
    $scope.$watch('files', function () {
        controller.upload($scope.files);
    });

    this.upload = function (files) {

        postFiles = function (route){
          if (files && files.length) {
              for (var i = 0; i < files.length; i++) {
                var file = files[i];
                if (!file.$error) {
                  Upload.upload({
                      //manage the route here based on scope
                      url: route,
                      data: {
                        file: file
                      }
                  }).then(function(data){
                    console.log($scope);
                    console.log($scope.tenant);
                    console.log($scope.investment);
                    console.log(data);

                    if( $scope.tenant === undefined ){
                      $scope.investment.files.push(data.data.files[data.data.files.length -1]);
                    }else if ( $scope.tenant !== undefined ) {
                      $scope.tenant.files.push(data.data.files[data.data.files.length -1]);
                    }

                  });
                }
              }
          }

        };

        if($scope.tenant === undefined){
          route = '/investments/addFile/'+$scope.investment._id;
          postFiles(route);
        }else if($scope.tenant !== undefined){
          route = '/tenants/addFile/'+$scope.tenant._id;
          postFiles(route);
        }

    };
}]);
