angular.module('login')
    .factory("loginService" , ['$q','$http', function ($q,$http) {

        return {
            login: login,
            refresh: refresh
        };

        function login(data){
            var defer = $q.defer();
            $http.get('src/core/login/assets/token.json').then(function (data) {
                    defer.resolve(data);
                }
                , function () {
                    defer.reject('could not find token.json');
                });
            return defer.promise;

        }

        function refresh(data){
            var defer = $q.defer();
            $http.get('src/core/login/assets/refresh.json').then(function (data) {
                    defer.resolve(data);
                }
                , function () {
                    defer.reject('could not find token.json');
                });
            return defer.promise;

        }

        // function login(data) {
        //     return $http({
        //         method: 'POST',
        //         url: 'http://backend.aliens.com/api/login',
        //         data: data
        //     }).success(function (response) {
        //         return response;
        //     }).error(function () {
        //         console.log('XHR Failed for login');
        //     })
        // }

        // function refresh(data) {
        //     return $http({
        //         method: 'POST',
        //         url: 'http://backend.aliens.com/api/refreshToken',
        //         data: data
        //     }).success(function (response) {
        //         return response;
        //     }).error(function () {
        //         console.log('XHR Failed for login');
        //     })
        // }

    }]);