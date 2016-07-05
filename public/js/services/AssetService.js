app.factory('AssetService', function AssetService($q, $http) {
    return {

        getAssetListData: function () {
            var deferred = $q.defer();
            $http.get('data/asset-list.json')
                .success(function(data) {
                    deferred.resolve(data);
                })
                .error(function() {
                    deferred.reject();
                });
            return deferred.promise;
        },

        getComments: function (category, odd) {
            var deferred = $q.defer();
            var type = odd ? 'odd' : 'even';
            $http.get('data/' + type + '-comment-list.json')
                .success(function(data) {
                    deferred.resolve(data);
                })
                .error(function() {
                    deferred.reject();
                });
            return deferred.promise;

        }

    }
});
