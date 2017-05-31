angular.module('createsurvey')
    .factory("createSurveyService" , ['$q','$http','dataGetService','$timeout', function ($q,$http, dataGetService, $timeout) {
        return {
            createSurvey: createSurvey,
            updateSurvey: updateSurvey
        }

        function createSurvey(data) {
            return $http({
                method: 'POST',
                url: 'http://aliens.dev.easternenterprise.com/api/survey/create',
                data: data
            }).success(function (response) {
                return response;
            }).error(function (response) {
                console.log('XHR Failed for creating survey');
                $timeout(function () {
                    dataGetService.errors(response.message, 1500);
                },500);
            })
        }

        function updateSurvey(data) {
            return $http({
                method: 'POST',
                url: 'http://aliens.dev.easternenterprise.com/api/survey/update',
                data: data
            }).success(function (response) {
                return response;
            }).error(function (response) {
                console.log('XHR Failed for updating survey');
                $timeout(function () {
                    dataGetService.errors(response.message, 1500);
                },500);
            })
        }

    }]);