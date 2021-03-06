angular.module('results', ['notification', 'chart.js'])
    .controller("resultController" , ['$scope','$rootScope','dataGetService','$timeout','resultService','$filter','$location', function ($scope,$rootScope, dataGetService, $timeout, resultService,$filter, $location) {
        $rootScope.loggedInPersonName =localStorage.getItem("loggedInPersonName");
        $scope.type = "company";
        $rootScope.activeCreateSurveyTab = false;
        $rootScope.activeSurveyTab = false;
        $rootScope.activeResultsTab = true;
        $scope.resultsview = true;
        $scope.participantview = false;
        $scope.locationview = false;
        $scope.viewerParticipant = false;
        Array.prototype.unique = function() {
            return this.filter(function (value, index, self) {
                return self.indexOf(value) === index;
            });
        };
        function results() {
            resultService.getResultsData().then(function (response) {
                $scope.resultdata = response.data.data.resultByCompany;
                $scope.totalNoOfEntries = [];
                $scope.totalNoOfParticipants = [];
                if($scope.resultdata){
                    angular.forEach($scope.resultdata, function (item) {
                        $scope.totalNoOfEntries.push(item.no_of_entries_count);
                        $scope.totalNoOfParticipants.push(item.no_of_participants_count);
                        var sumOfEntries = $scope.totalNoOfEntries.reduce(add, 0);
                        var sumOfParticipants = $scope.totalNoOfParticipants.reduce(add, 0);
                        function add(a, b) {
                            return a + b;
                        }
                        $scope.sumOfEntries = sumOfEntries;
                        $scope.sumOfParticipants = sumOfParticipants;
                    });
                };
            });
        };
        results();

        function getValues() {
            resultService.getLocations().then(function (response) {
                $scope.locations = [];
                angular.forEach(response.data.data.location, function (item) {
                    $scope.locations.push(item);
                });
            });
            resultService.getParticipants().then(function (response) {
                $scope.participants = [];
                angular.forEach(response.data.data.names, function (item) {
                    $scope.participants.push(item);
                });
            });
        };

        getValues();

        $scope.showBarGraph = function (data) {
            $scope.resultsview = true;
            $scope.locationview = false;
            $scope.participantview = false;
            $scope.surveyName = data.name;
            getGraphDataByCompany(data);
        };

        $scope.showBarGraphLocation = function (data) {
            $scope.resultsview = false;
            $scope.locationview = true;
            $scope.participantview = false;
            $scope.surveyName = data.name;
            getGraphDataByLocation(data);
        };

        $scope.showBarGraphParticipant = function (data) {
            $scope.resultsview = false;
            $scope.locationview = false;
            $scope.participantview = true;
            $scope.surveyName = data.survey_name;
            getGraphDataByParticipant(data);
        };
        // $scope.showAllResults = function () {
        //     $scope.viewerParticipant = false;
        //     $scope.surveyName = "Results";
        //     $scope.data = [$scope.sumOfEntries];
        //     $scope.labels = [$scope.sumOfParticipants];
        // };

        $scope.showByLocation = function () {
            if($scope.locationSelected == 'Select Location'){
                $scope.resultsview = true;
                $scope.locationview = false;
                $scope.participantview = false;
                results();
                return;
            }
            if($scope.locationSelected == undefined){
                return;
            } else {
                resultService.getResultByLocation($scope.locationSelected).then(function (response) {
                    if(response.data.success && response.data.status_code){
                        $scope.resultsview = false;
                        $scope.participantview = false;
                        $scope.locationview = true;
                        $scope.resultdatabylocation = response.data.data.locationResult;
                    };
                });
            }
        };

        $scope.showByParticipant = function () {
            if($scope.participantSelected == 'Select Participant'){
                $scope.resultsview = true;
                $scope.locationview = false;
                $scope.participantview = false;
                results();
                return;
            }
            if($scope.participantSelected == undefined){
                return;
            } else {
                resultService.getResultByParticipants($scope.participantSelected).then(function (response) {
                    if (response.data.success && response.data.status_code) {
                        $scope.resultsview = false;
                        $scope.participantview = true;
                        $scope.locationview = false;
                        $scope.resultdatabyparticipant = response.data.data.resultByParticipant;
                    }
                    ;
                });
            }
        };

        $scope.showByCompany = function () {
            $scope.resultsview = true;
            $scope.participantview = false;
            $scope.locationview = false;
            results();
        };


        function getGraphDataByCompany(data){
            resultService.getGraphData(data.id).then(function (response) {
                if(response.data.success && response.data.status_code) {
                    $scope.graphdata = response.data.data.result;
                }
            });
        }

        function  getGraphDataByLocation(data) {
            resultService.getGraphDataByLocation(data.survey_id, $scope.locationSelected).then(function (response) {
                if(response.data.success && response.data.status_code){
                   $scope.graphdata = response.data.data.result;
                }
            });
        }

        function getGraphDataByParticipant(data) {
            resultService.getGraphDataByParticipant(data.survey_id, data.part_id).then(function (response) {
                if(response.data.success && response.data.status_code){
                    $scope.graphdataparticipant = response.data.data;
                }
            });
        }

    }]);


