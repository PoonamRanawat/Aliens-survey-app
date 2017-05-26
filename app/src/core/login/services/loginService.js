angular.module('login')
    .factory("loginService" , ['$q','$http', function ($q,$http) {

        return {
            login: login,
            refresh: refresh,
            logout:logout
        };

        function login(data) {
            return $http({
                method: 'POST',
                url: 'http://aliens.dev.easternenterprise.com/api/login',
                data: data
            }).success(function (response) {
                return response;
            }).error(function () {
                console.log('XHR Failed for login');
            })
        }

        function refresh(data) {
            return $http({
                method: 'POST',
                url: 'http://aliens.dev.easternenterprise.com/api/refreshToken',
                data: data
            }).success(function (response) {
                return response;
            }).error(function () {
                console.log('XHR Failed for refresh token');
            })
        }

        function logout() {
            return $http({
                method: 'POST',
                url: 'http://aliens.dev.easternenterprise.com/api/logout'
            }).success(function (response) {
                return response;
            }).error(function () {
                console.log('XHR Failed for logout');
            })
        }

    }]);