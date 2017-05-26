angular.module('survey')
    .factory("surveyOverviewservice" , ['$q','$http', function ($q,$http) {
        return {
            getSurveyData: getSurveyData
        }


        // function getSurveyData() {
        //     return $http({
        //         method: 'GET',
        //         url: 'http://aliens.dev.easternenterprise.com/api/users/List',
        //     }).success(function (response) {
        //         return response;
        //     }).error(function () {
        //         console.log('XHR Failed for getting list of users');
        //     })
        // }

        function getSurveyData(){
            var defer = $q.defer();
            $http.get('src/modules/survey/assets/surveydata.json').then(function (data) {
                    defer.resolve(data);
                }
                , function () {
                    defer.reject('could not find token.json');
                });
            return defer.promise;
        }
    }]);