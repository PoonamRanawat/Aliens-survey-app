angular.module('createsurvey', ['naif.base64'])
    .controller("createSurveyCtrl" , ['$scope','$rootScope','createSurveyService', function ($scope, $rootScope, createSurveyService) {
        console.log($rootScope.dataToEditSurvey);
        $rootScope.activeCreateSurveyTab = true;
        $rootScope.activeSurveyTab = false;

        $scope.createSurvey = function (data) {
            var request = {
                "logo_path": data.yourModel,
                "nameOfSurvey": data.nameOfSurvey,
                "description": data.description,
                "message": data.message

            }
            createSurveyService.createSurvey(request).then(function (response) {
                return response.data;
            });
        }

    }]);
