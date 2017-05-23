angular.module('login', [])
    .controller("loginController" , ['$scope' ,'loginService','$auth','$timeout', function ($scope, loginService, $auth,$timeout) {

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var hh = today.getHours();
        var min = today.getMinutes();
        var secs = today.getSeconds();

        if(dd<10) {
            dd='0'+dd;
        }

        if(mm<10) {
            mm='0'+mm;
        }

        today = mm+'/'+dd+'/'+yyyy + " " + hh + ":" + min + ":" + secs;


        $scope.login = function (user, pwd) {
            var password = 'password';
            var client_secret = 'l7irzNflVFLaYnJ0mnlC21jSoRfavXPKmHCIFBU2';
            var data = {
                grant_type: password,
                client_id:2,
                client_secret:client_secret,
                username: user,
                password: pwd
            }

            $scope.access = loginService.login(data).then(function(response){
                if(response.data.status_code == 200 && response.data.success){
                    localStorage.setItem("expiry_time",response.data.data.expires_in);
                    localStorage.setItem('refresh_token',response.data.data.refresh_token);
                    var expiry = JSON.parse(localStorage.getItem("expiry_time"));
                    $auth.removeToken();
                    $auth.setToken(response.data.data.access_token);
                    setInterval(function(){refresh()},60000);
                }
            });

            function refresh() {
                var refresh_token = 'refresh_token';
                data ['grant_type'] =  refresh_token;
                data ['refresh_token'] = localStorage.getItem("refresh_token");
                $scope.access = loginService.refresh(data).then(function (response) {
                    if(response.data.status_code == 200 && response.data.success){
                        localStorage.setItem("expiry_time",response.data.data.expires_in);
                        var expiry = JSON.parse(localStorage.getItem("expiry_time"));
                        $auth.removeToken();
                        $auth.setToken(response.data.data.access_token);
                        setInterval(function(){refresh()},60000);

                    }
                })
            }
        }
    }]);