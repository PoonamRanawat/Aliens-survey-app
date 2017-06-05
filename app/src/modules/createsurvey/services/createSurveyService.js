angular.module('createsurvey')
    .factory("createSurveyService" , ['$q','$http','dataGetService','$timeout', function ($q,$http, dataGetService, $timeout) {
        return {
            createSurvey: createSurvey,
            updateSurvey: updateSurvey,
            saveSurvey: saveSurvey,
            getSurveyDetail : getSurveyDetail,
            saveSurveyInfo : saveSurveyInfo
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
                if(response.message == 'Unathenticated'){
                    $location.path('/');
                }
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
                if(response.message == 'Unathenticated'){
                    $location.path('/');
                }
            })
        }

        function saveSurvey(data) {
            return $http({
                method: 'POST',
                url: 'http://aliens.dev.easternenterprise.com/api/question/create?survey_id=' + 61,
                data: data
            }).success(function (response) {
                return response;
            }).error(function (response) {
                console.log('XHR Failed for saving survey');
                $timeout(function () {
                    dataGetService.errors(response.message, 1500);
                },500);
                if(response.message == 'Unathenticated'){
                    $location.path('/');
                }
            })
        }

        function getSurveyDetail(surveyId) {
            return $http({
                method: 'GET',
                url: 'http://aliens.dev.easternenterprise.com/api/survey-detail/?survey_id='+surveyId,
            }).success(function (response) {
                return response;
            }).error(function (response) {
                console.log('XHR Failed for creating survey');
                $timeout(function () {
                    dataGetService.errors(response.message, 1500);
                },500);
                if(response.message == 'Unathenticated'){
                    $location.path('/');
                }
            })
        }
        
        function saveSurveyInfo(data, surveyId) {
            return $http({
                method: 'POST',
                url: 'http://aliens.dev.easternenterprise.com/api/question/create?survey_id=' + surveyId,
                data: data
            }).success(function (response) {
                return response;
            }).error(function (response) {
                console.log('XHR Failed for saving survey');
                $timeout(function () {
                    dataGetService.errors(response.message, 1500);
                },500);
                if(response.message == 'Unathenticated'){
                    $location.path('/');
                }
            })
        };

    }]);