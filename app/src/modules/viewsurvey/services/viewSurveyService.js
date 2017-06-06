angular.module('viewsurvey')
    .factory("viewSurveyService" , ['$q','$http', function ($q, $http) {
        return{
            getSurveyDetails: getSurveyDetails
        };

        function getSurveyDetails() {
            var defer = $q.defer();
            $http.get('src/modules/results/assets/surveydetails.json').then(function (data) {
                    defer.resolve(data);
                }
                , function () {
                    defer.reject('could not find token.json');
                });
            return defer.promise;
        };

    }]);