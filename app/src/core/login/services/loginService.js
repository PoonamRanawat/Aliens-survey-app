angular.module('login')
    .factory("loginService" , ['$q','$http','$location','toaster','API_URL', function ($q,$http, $location, toaster, API_URL) {
        return {
            login: login,
            refresh: refresh,
            logout:logout
        };

        //Function to login - start
        function login(data) {
            return $http({
                method: 'POST',
                url: API_URL+'/api/login',
                data: data
            }).success(function (response) {
                return response;
            }).error(function (response) {
                if(!response.success){
                    toaster.error("Invalid username or password");
                }
            });
        }
        //Function to login - end

        //Function to refresh token - start
        function refresh(data) {
            return $http({
                method: 'POST',
                url:  API_URL+'/api/refreshToken',
                data: data
            }).success(function (response) {
                return response;
            }).error(function (response) {
                return response;
            });
        }
        //Function to refresh token - end

        //Function to logout - start
        function logout() {
            return $http({
                method: 'POST',
                url:  API_URL+'/api/logout'
            }).success(function (response) {
                return response;
            }).error(function (response) {
                return response;
            });
        }
        //Function to logout - end
    }]);