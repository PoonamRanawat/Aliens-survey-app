angular.module('survey', [])
    .controller("surveyOverviewCtrl" , ['$scope','$rootScope','surveyOverviewservice','$location', function ($scope, $rootScope,surveyOverviewservice, $location) {

        $rootScope.activeSurveyTab = true;
        $rootScope.activeCreateSurveyTab = false;

        $scope.data = surveyOverviewservice.getSurveyData().then(function (response) {
            $scope.surveydata = response.data.data;
        });

        $scope.deleteItem = function (data) {
            $rootScope.itemTodelete = data.id;
        }

        //delete user - start
        $scope.delete = function (data) {
            var request = {
                id : data
            }
            surveyOverviewservice.deleteItem(request).then(function (response) {
                if(response.data.success){
                    $('#myDeleteItemModal').modal('hide');
                }
                return response.data;
            })
        };
        //delete user - end
        $scope.openParticipantView = true;
        $scope.openParticipantView = function () {
            $scope.openParticipantView = true;
            $scope.addParticipantView = false;
        };

        $scope.addParticipantView = function () {
            $scope.addParticipantView = true;
            $scope.openParticipantView = false;
        };

        $scope.data = surveyOverviewservice.getParticipantData().then(function (response) {
            $scope.participantData = response.data.data;
        });
        
        $scope.storeSurveyData = function (data) {
            $rootScope.surveyName = data.name;
        };

        $scope.editParticipantData = function (data) {
            $scope.dataToEdit = jQuery.extend({}, data);
            $location.path('/addparticipant');
        };

        $scope.cancelParticipant = function () {
            $location.path('/participant');
        };

        $scope.editSurveyData = function (data) {
            $rootScope.dataToEditSurvey = jQuery.extend({}, data);
            $location.path('/createsurvey');
        }

    }]);