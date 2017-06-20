angular.module('user')
    .factory("userService" , ['$q','$http','$location','API_URL','toaster', function ($q,$http, $location, API_URL, toaster) {
        return {
            getUserData: getUserData,
            addUser: addUser,
            updateUser: updateUser,
            deleteUser: deleteUser,
            getEditData: getEditData
        };

        function onError(response) {
            if(response.message == 'Unathenticated'){
                $location.path('/');
            }
        }

        function getUserData() {
            return $http({
                method: 'GET',
                url: API_URL +'/api/users/List',
            }).success(function (response) {
                return response;
            }).error(function (response) {
                toaster.error(response.message);
                onError(response);
            });
        }

        function addUser(data) {
            return $http({
                method: 'POST',
                url: API_URL+'/api/user/create',
                data: data
            }).success(function (response) {
                return response;
            }).error(function (response) {
                toaster.error(response.message);
                onError(response);
            });
        }

        function updateUser(data) {
            return $http({
                method: 'PUT',
                url: API_URL+'/api/user/update',
                data: data
            }).success(function (response) {
                return response;
            }).error(function (response) {
                toaster.error(response.message);
                onError(response);
            });
        }

        function deleteUser(data){
            return $http({
                method: 'DELETE',
                url: API_URL+'/api/user/delete?id=' +  data
            }).success(function (response) {
                return response;
            }).error(function (response) {
                toaster.error(response.message);
                onError(response);
            });
        }

        function getEditData(data) {
            return $http({
                method: 'GET',
                url: API_URL+'/api/user/edit?user_id=' + data,
            }).success(function (response) {
                return response;
            }).error(function (response) {
                toaster.error(response.message);
                onError(response);
            });
        }

    }]);