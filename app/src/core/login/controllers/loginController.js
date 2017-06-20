angular.module('login', [])
    .controller("loginController" , ['$scope' ,'loginService','$auth','$location','$rootScope', function ($scope, loginService, $auth, $location, $rootScope) {
        $scope.data = {
            grant_type: 'password',
            client_id:2,
            client_secret: 'zweSbThZRtujlkrqA5uogn3Zn30Htzl6y9IDT1YM'
        }
        //Function to login - start
        $scope.login = function (user, pwd) {
            $scope.data ['username'] = user;
            $scope.data ['password'] = pwd;
            $scope.access = loginService.login($scope.data).then(function(response){
                if (response.data.status_code == 200 && response.data.success){
                        localStorage.setItem("expiry_time",response.data.data.tokenDetails.expires_in);
                        localStorage.setItem('refresh_token',response.data.data.tokenDetails.refresh_token);
                        var expiry = JSON.parse(localStorage.getItem("expiry_time"));
                        $auth.removeToken();
                        $auth.setToken(response.data.data.tokenDetails.access_token);
                        setInterval(function(){refresh()},expiry * 1000);
                        $rootScope.loggedInPersonName = response.data.data.userName;
                        localStorage.setItem('loggedInPersonName',response.data.data.userName);
                    if(response.data.data.userType == 'admin' ){
                        $location.path('/userlist');
                    } else if(response.data.data.userType == 'customer'){
                        $location.path('/surveyoverview');
                    }
                }
            });
        };
        //Function to login - end

        //Function to refresh token - start
        function refresh() {
            //var refresh_token = 'refresh_token';
            $scope.data ['grant_type'] = 'refresh_token';
            $scope.data ['refresh_token'] = localStorage.getItem("refresh_token");
            delete $scope.data ["username"];
            delete $scope.data ["password"];
            $scope.access = loginService.refresh($scope.data).then(function (response) {
                if(response.data.status_code == 200 && response.data.success){
                    localStorage.setItem("expiry_time",response.data.data.expires_in);
                    var expiry = JSON.parse(localStorage.getItem("expiry_time"));
                    localStorage.setItem('refresh_token',response.data.data.refresh_token);
                    setInterval(function(){refresh()},expiry * 1000);
                } else if(!response.data.success && response.data.message == 'Unathenticated'){
                    $location.path('/');
                }
            });
        }
        //Function to refresh token - end

        //Function to logout - start
        $scope.logout = function () {
            loginService.logout().then(function (response) {
                if(response.status == 200 && response.data.success){
                    $auth.removeToken();
                    localStorage.removeItem("expiry_time");
                    localStorage.removeItem("refresh_token");
                    $location.path('/');
                    return response;
                } else if(!response.data.success && response.data.message == 'Unathenticated'){
                    $location.path('/');
                }
            });
        };
        //Function to logout - end
    }]);