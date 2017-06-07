angular.module('viewsurvey')
    .factory("viewSurveyService" , ['$q','$http','dataGetService','$timeout','$location', function ($q, $http,dataGetService, $timeout,$location) {
        return{
            getSurveyDetails: getSurveyDetails,
            submitAnswers: submitAnswers
        };

        function getSurveyDetails(data, id) {
            return $http({
                method: 'GET',
                url: 'http://aliens.dev.easternenterprise.com/api/survey-details?survey_id=' + data + '&participant=' + id,
            }).success(function (response) {
                return response;
            }).error(function (response) {
                console.log('XHR Failed for getting survey details');
                $timeout(function () {
                    dataGetService.errors(response.message, 1500);
                },500);
                // if(response.message == 'Unathenticated'){
                //     $location.path('/');
                // }
            })
        };

        function submitAnswers(data) {
            return $http({
                method: 'POST',
                url: 'http://aliens.dev.easternenterprise.com/api/survey/answer',
                data: data
            }).success(function (response) {
                return response;
            }).error(function (response) {
                console.log('XHR Failed for submitting survey');
                $timeout(function () {
                    dataGetService.errors(response.message, 5000);
                },50);
                // if(response.message == 'Unathenticated'){
                //     $location.path('/');
                // }
            })
        }


    }]);