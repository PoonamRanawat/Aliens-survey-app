angular.module('survey', [])
    .controller("surveyOverviewCtrl" , ['$scope','surveyOverviewservice', function ($scope, surveyOverviewservice) {
        $scope.data = surveyOverviewservice.getSurveyData().then(function (response) {
            $scope.surveydata = response.data.data;
        });
    }]);