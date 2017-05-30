angular.module('survey', [])
    .controller("surveyOverviewCtrl" , ['$scope','$rootScope','surveyOverviewservice','$location','CommonService', function ($scope, $rootScope,surveyOverviewservice, $location, CommonService) {

        $rootScope.activeSurveyTab = true;
        $rootScope.activeCreateSurveyTab = false;
        $scope.activeParticipant = true;
        if($location.path() == '/participant'){
                $scope.activeParticipant = true;
                $scope.activeaddparticipant = false;
        }
        if($location.path() == '/addparticipant'){
                $scope.activeaddparticipant = true;
                $scope.activeParticipant = false;
        }
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
                surveyOverviewservice.getParticipantData();
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


        $scope.storeSurveyData = function (data) {
            $rootScope.surveyName = data.surveyName;
            $rootScope.surveyId = data.id;
            console.log(data);
            $scope.data = surveyOverviewservice.getParticipantData(data.id).then(function (response) {
                $rootScope.participantData = response.data.data;
                console.log($scope.participantData);
                $location.path('/participant');
            });
        };

        $scope.addParticipant = function (firstname, lastname, email, location) {
            var request = {
                "first_name": firstname,
                "last_name": lastname,
                "email": email,
                "location": location,
                "id": $rootScope.surveyId
            }

            surveyOverviewservice.addParticipant(request).then(function (response) {
                if(response.data.success){
                    $location.path('/surveyoverview');
                } else if(!response.data.success && response.data.message === 'email already exist email'){
                    alert("Email already exist, Please use another email id")
                }
            })
        };

        $scope.editParticipantData = function (data) {
            CommonService.setData(data);
            //$rootScope.dataToEditParticipant = jQuery.extend({}, data);
            editData();
            $location.path('/addparticipant');

        };

        if(CommonService.getFlag())
        {
            $scope.dataToEditParticipant='';
        }else{
            editData();
            CommonService.setFlag(true);
        }

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