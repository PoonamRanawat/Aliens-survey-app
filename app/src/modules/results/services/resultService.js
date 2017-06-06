angular.module('results')
    .factory("resultService" , ['$q','$http','dataGetService','$timeout','$location', function ($q,$http, dataGetService, $timeout,$location) {
        return {
            getResultsData: getResultsData
        }
        
        function getResultsData() {
            var defer = $q.defer();
            $http.get('src/modules/results/assets/results.json').then(function (data) {
                    defer.resolve(data);
                }
                , function () {
                    defer.reject('could not find token.json');
                });
            return defer.promise;
        };

        // function getResultsData() {
        //     return $http({
        //         method: 'GET',
        //         url: 'http://aliens.dev.easternenterprise.com/api/survey/result',
        //     }).success(function (response) {
        //         return response;
        //     }).error(function (response) {
        //         console.log('XHR Failed for creating survey');
        //         $timeout(function () {
        //             dataGetService.errors(response.message, 1500);
        //         },500);
        //         if(response.message == 'Unathenticated'){
        //             $location.path('/');
        //         }
        //     })
        // };
    }]);