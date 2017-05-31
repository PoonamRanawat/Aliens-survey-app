angular.module('login')
    .factory("loginService" , ['$q','$http','$timeout','dataGetService','$location', function ($q,$http, $timeout, dataGetService, $location) {

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
            }).error(function (response) {
                console.log('XHR Failed for login');
                if(!response.success){
                    $timeout(function () {
                        dataGetService.errors('Invalid username or password', 5000);
                    },50);
                }
            })
        }

        function refresh(data) {
            return $http({
                method: 'POST',
                url: 'http://aliens.dev.easternenterprise.com/api/refreshToken',
                data: data
            }).success(function (response) {
                return response;
            }).error(function (response) {
                console.log('XHR Failed for refresh token');
                if(!response.success){
                    $location.path('/');
                }
            })
        }

        function logout() {
            return $http({
                method: 'POST',
                url: 'http://aliens.dev.easternenterprise.com/api/logout'
            }).success(function (response) {
                return response;
            }).error(function (response) {
                console.log('XHR Failed for logout');
                if(!response.success){
                    $location.path('/');
                }
            })
        }

    }]);