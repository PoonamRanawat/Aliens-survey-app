angular.module('login')
    .service("loginService" , ['$q','$auth','$http', function ($q,$auth, $http) {

        return {
            login: login
        }

        function login(username, password){
            var defer = $q.defer();
                $http.get('src/core/login/assets/token.json').then(function (data) {
                    defer.resolve(data);
                }
                , function () {
                    defer.reject('could not find token.json');
                });
            return defer.promise;

        }
    }]);