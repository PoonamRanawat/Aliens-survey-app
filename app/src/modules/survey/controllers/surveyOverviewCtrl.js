angular.module('survey', ['notification'])
    .controller("surveyOverviewCtrl" , ['$scope','$rootScope','surveyOverviewservice','$location','CommonService','dataGetService','$timeout', function ($scope, $rootScope,surveyOverviewservice, $location, CommonService, dataGetService, $timeout) {

        $rootScope.activeSurveyTab = true;
        $rootScope.activeCreateSurveyTab = false;
        $rootScope.activeResultsTab = false;
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
                $scope.surveydata = response.data.data.resultByCompany;
            });
        }
        surveyList();


        $scope.deleteItem = function (data) {
            $rootScope.itemTodelete = data.id;
        }

        //delete user - start
        $scope.delete = function (data, flag) {
            if(flag){
                surveyOverviewservice.deleteParticipant(data).then(function (response) {
                    if(response.data.success){
                        $timeout(function () {
                            dataGetService.success('Participant deleted successfully', 1500);
                        },200);
                        $('#myDeleteItemModal').modal('hide');
                    }
                    //surveyList();
                    getPaticipantsData();
                    //surveyOverviewservice.getParticipantData();
                    return response.data;
                })
            } else{
                surveyOverviewservice.deleteItem(data).then(function (response) {
                    if(response.data.success){
                        $timeout(function () {
                            dataGetService.success('Survey deleted successfully', 1500);
                        },200);
                        $('#myDeleteItemModal').modal('hide');
                    }
                    surveyList();
                    //surveyOverviewservice.getParticipantData();
                    return response.data;
                })
            }
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
            $rootScope.surveyName = data.name;
            $rootScope.surveyId = data.id;
            getPaticipantsData();
        };

        function getPaticipantsData(){
            $scope.data = surveyOverviewservice.getParticipantData($rootScope.surveyId).then(function (response) {
                $rootScope.participantData = response.data.data;
                $location.path('/participant');
            });
        }

       function validateParticipant(firstname, lastname, email, location) {
            if (!firstname) {
                $timeout(function () {
                    dataGetService.errors('Please enter Firstname', 1500);
                },500);
                return false;
            } else if(!lastname){
                $timeout(function () {
                    dataGetService.errors('Please enter Lastname', 1500);
                },500);
            } else if(!email){
                $timeout(function () {
                    dataGetService.errors('Please enter valid Email', 1500);
                },500);
            } else if(!location){
                $timeout(function () {
                    dataGetService.errors('Please enter Location', 1500);
                },500);
            }
            return true;
        };

        $scope.addParticipant = function (firstname, lastname, email, location, id) {
            var validated = validateParticipant(firstname, lastname, email, location);
            var request = {
                "first_name": firstname,
                "last_name": lastname,
                "email": email,
                "location": location
            }
            if(validated){
                if(id){
                    //update
                    request ['id'] =  $rootScope.participantId
                    surveyOverviewservice.updateParticipant(request, $rootScope.participantId).then(function (response) {
                        if(response.data.success){
                            $timeout(function () {
                                dataGetService.success('Paticipant updated successfully', 5000);
                            },50);
                            getPaticipantsData();
                        }
                    })
                } else {
                    //create call
                    request ['id'] =  $rootScope.surveyId
                    surveyOverviewservice.addParticipant(request).then(function (response) {
                        if(response.data.success){
                            $timeout(function () {
                                dataGetService.success('Paticipant added successfully', 5000);
                            },50);
                            getPaticipantsData();
                            //$location.path('/participant');
                        } else if(!response.data.success && response.data.message === 'email already exist email'){
                            alert("Email already exist, Please use another email id")
                        }
                    })
                }
            }
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
            $rootScope.participantId = $scope.dataToEditParticipant.id;

        }


        $scope.cancelParticipant = function () {
            $location.path('/participant');
        };

        $scope.editSurveyData = function (data) {
            $rootScope.editSurveyId = data.id;
            $location.path('/edit-survey/'+data.id);
        }

    }]);