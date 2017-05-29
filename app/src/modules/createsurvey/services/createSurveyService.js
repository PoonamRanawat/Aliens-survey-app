angular.module('createsurvey')
    .factory("createSurveyService" , ['$q','$http', function ($q,$http) {
        return {
            createSurvey: createSurvey
        }

        function createSurvey(data) {
            return $http({
                method: 'POST',
                url: 'http://aliens.dev.easternenterprise.com/api/survey/create',
                data: data
            }).success(function (response) {
                return response;
            }).error(function () {
                console.log('XHR Failed for creating survey');
            })
        }
    }]);