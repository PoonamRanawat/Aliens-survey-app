angular.module('login', [])
    .controller("loginController" , ['$scope' ,'loginService','$auth','$location', function ($scope, loginService, $auth, $location) {
        $scope.login = function (user, pwd) {
            var password = 'password';
            var client_secret = 'zweSbThZRtujlkrqA5uogn3Zn30Htzl6y9IDT1YM';
            var data = {
                grant_type: password,
                client_id:2,
                client_secret:client_secret,
                username: user,
                password: pwd
            }

            $scope.access = loginService.login(data).then(function(response){
                if(response.data.success == false ){
                    alert("Invalid username or password");
                }
                else if (response.data.status_code == 200 && response.data.success){
                    if(response.data.data.userType == 'admin' ){
                        localStorage.setItem("expiry_time",response.data.data.tokenDetails.expires_in);
                        localStorage.setItem('refresh_token',response.data.data.tokenDetails.refresh_token);
                        var expiry = JSON.parse(localStorage.getItem("expiry_time"));
                        $auth.removeToken();
                        $auth.setToken(response.data.data.tokenDetails.access_token);
                        setInterval(function(){refresh()},expiry * 1000);
                        $location.path('/userlist');
                    }
                }

            });

            function refresh() {
                var refresh_token = 'refresh_token';
                data ['grant_type'] =  refresh_token;
                data ['refresh_token'] = localStorage.getItem("refresh_token");
                delete data["username"];
                delete data["password"];
                $scope.access = loginService.refresh(data).then(function (response) {
                    if(response.data.status_code == 200 && response.data.success){
                        localStorage.setItem("expiry_time",response.data.data.expires_in);
                        var expiry = JSON.parse(localStorage.getItem("expiry_time"));
                        localStorage.setItem('refresh_token',response.data.data.refresh_token);
                        setInterval(function(){refresh()},expiry * 1000);
                    }
                })
            }
        }


        $scope.logout = function () {
            loginService.logout().then(function (response) {
                if(response.status == 200 && response.data.success){
                    $auth.removeToken();
                    localStorage.removeItem("expiry_time");
                    localStorage.removeItem("refresh_token");
                    $location.path('/');
                    return response;
                }
            })
        }
    }]);