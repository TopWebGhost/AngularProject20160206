
app.factory('AuthService', function UserService($q, $http, $rootScope, $cookieStore, $location) {

    var savedUser = $cookieStore.get('user');
    if (savedUser && typeof savedUser == 'string') {
        savedUser = JSON.parse(savedUser);
    }

    if (savedUser && savedUser.email) {
        $rootScope.currentUser = savedUser || null;
    } else {
        $cookieStore.remove('user');
    }

    return {
        isLoggedIn:  function () {
            var user = $rootScope.currentUser;
            return !!user;
        },

        login: function (params) {
            var deferred = $q.defer();
            $http({
                method:'POST',
                url:'/users/login',
                data: params
            })
            .success(function(userInfo) {
                if (userInfo && userInfo.loggedIn) {
                    $rootScope.currentUser = userInfo.user;
                    $cookieStore.put('user', JSON.stringify(userInfo.user));
                }
                deferred.resolve(userInfo);
            })
            .error(function(res) {
                console.log("Error in login:", err, info);
                deferred.reject();
            });
            return deferred.promise;
        },

        logout: function () {
            var deferred = $q.defer();
            $http.get('/users/logout', {})
            .success(function(response) {
                if (response.done) {
                    delete $rootScope.currentUser;
                    $cookieStore.remove('user');
                }
                deferred.resolve(response);
            })
            .error(function(err, info) {
                console.log("Error in logout:", err, info);
                deferred.reject(err.errors);
            });

            return deferred.promise;
        },

        validateSession: function () {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/users/validateSession',
            }).success(function onSuccess (userInfo) {
                if (userInfo && userInfo.loggedIn) {
                    $rootScope.currentUser = userInfo.user;
                    $cookieStore.put('user', JSON.stringify(userInfo.user));
                }
                deferred.resolve(userInfo.loggedIn);

            }).error(function onError (response) {
                  $cookieStore.remove('user');
                  $location.path('login');
                  deferred.reject(err);
            });

            return deferred.promise;
        }
    }
});
