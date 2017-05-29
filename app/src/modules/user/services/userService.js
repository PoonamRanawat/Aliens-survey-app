angular.module('user')
    .factory("userService" , ['$q','$http', function ($q,$http) {
        return {
            getUserData: getUserData,
            addUser: addUser,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        
        // function getUserData() {
        //     var defer = $q.defer();
        //     $http.get('src/modules/user/assets/userlist.json').then(function (data) {
        //             defer.resolve(data);
        //         }
        //         , function () {
        //             defer.reject('could not find users.json');
        //         });
        //     return defer.promise;
        // }

        function getUserData() {
            return $http({
                method: 'GET',
                url: 'http://aliens.dev.easternenterprise.com/api/users/List',
            }).success(function (response) {
                return response;
            }).error(function () {
                console.log('XHR Failed for getting list of users');
            })
        }

        function addUser(data) {
            return $http({
                method: 'POST',
                url: 'http://aliens.dev.easternenterprise.com/api/user/create',
                data: data
            }).success(function (response) {
                return response;
            }).error(function () {
                console.log('XHR Failed for adding new user');
            })
        }

        function updateUser(data) {
            return $http({
                method: 'PUT',
                url: 'http://aliens.dev.easternenterprise.com/api/user/update',
                data: data
            }).success(function (response) {
                return response;
            }).error(function () {
                console.log('XHR Failed for updating user');
            })
        }

        function deleteUser(data){
            return $http({
                method: 'DELETE',
                url: 'http://aliens.dev.easternenterprise.com/api/user/delete?id=' +  data
               // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            }).success(function (response) {
                return response;
            }).error(function () {
                console.log('XHR Failed for deleting user');
            })
        }
    }]);