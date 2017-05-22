angular.module('login', [])
    .controller("loginController" , ['$scope' ,'loginService','$auth', function ($scope, loginService, $auth) {

        $scope.login = function (username, password) {
            $scope.access = loginService.login(username, password).then(function(response){
                $auth.setToken(response.data["access-token"]);
            });
        }
    }]);