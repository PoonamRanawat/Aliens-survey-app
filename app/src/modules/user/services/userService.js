angular.module('user')
    .factory("userService" , ['$q','$http','dataGetService','$timeout','$location', function ($q,$http, dataGetService, $timeout, $location) {
        return {
            getUserData: getUserData,
            addUser: addUser,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        function getUserData() {
            return $http({
                method: 'GET',
                url: 'http://aliens.dev.easternenterprise.com/api/users/List',
            }).success(function (response) {
                return response;
            }).error(function (response) {
                console.log('XHR Failed for getting list of users');
                $timeout(function () {
                    dataGetService.errors(response.message, 1500);
                },500);
                if(response.message == 'Unathenticated'){
                    $location.path('/');
                }
            })
        }

        function addUser(data) {
            return $http({
                method: 'POST',
                url: 'http://aliens.dev.easternenterprise.com/api/user/create',
                data: data
            }).success(function (response) {
                return response;
            }).error(function (response) {
                console.log('XHR Failed for adding new user');
                $timeout(function () {
                    dataGetService.errors(response.message, 1500);
                },500);
                if(response.message == 'Unathenticated'){
                    $location.path('/');
                }
            })
        }

        function updateUser(data) {
            return $http({
                method: 'PUT',
                url: 'http://aliens.dev.easternenterprise.com/api/user/update',
                data: data
            }).success(function (response) {
                return response;
            }).error(function (response) {
                console.log('XHR Failed for updating user');
                $timeout(function () {
                    dataGetService.errors(response.message, 1500);
                },500);
                if(response.message == 'Unathenticated'){
                    $location.path('/');
                }
            })
        }

        function deleteUser(data){
            return $http({
                method: 'DELETE',
                url: 'http://aliens.dev.easternenterprise.com/api/user/delete?id=' +  data
               // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            }).success(function (response) {
                return response;
            }).error(function (response) {
                console.log('XHR Failed for deleting user');
                $timeout(function () {
                    dataGetService.errors(response.message, 1500);
                },500);
                if(response.message == 'Unathenticated'){
                    $location.path('/');
                }
            })
        }
    }]);