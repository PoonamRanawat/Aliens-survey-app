angular.module('survey', [])
    .controller("surveyOverviewCtrl" , ['$scope','$rootScope','surveyOverviewservice','$location','CommonService', function ($scope, $rootScope,surveyOverviewservice, $location, CommonService) {

        $rootScope.activeSurveyTab = true;
        $rootScope.activeCreateSurveyTab = false;
        function surveyList() {
            $scope.data = surveyOverviewservice.getSurveyData().then(function (response) {
                $scope.surveydata = response.data.data;
                console.log(response.data);
            });
        }
        surveyList();


        $scope.deleteItem = function (data) {
            $rootScope.itemTodelete = data.id;
        }

        //delete user - start
        $scope.delete = function (data) {
            surveyOverviewservice.deleteItem(data).then(function (response) {
                if(response.data.success){
                    $('#myDeleteItemModal').modal('hide');
                }
                surveyList();
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
            CommonService.setData(data);
            //$rootScope.dataToEditParticipant = jQuery.extend({}, data);
            editData();
            $location.path('/addparticipant');

        };
        editData();
        function editData() {
            $scope.dataToEditParticipant = CommonService.getData();
        }


        $scope.cancelParticipant = function () {
            $location.path('/participant');
        };

        $scope.editSurveyData = function (data) {
            $rootScope.dataToEditSurvey = jQuery.extend({}, data);
            $location.path('/createsurvey');
        }
    }]);