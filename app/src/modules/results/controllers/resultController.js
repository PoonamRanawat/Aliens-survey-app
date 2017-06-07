angular.module('results', ['notification', 'chart.js'])
    .controller("resultController" , ['$scope','$rootScope','dataGetService','$timeout','resultService','$filter','$location', function ($scope,$rootScope, dataGetService, $timeout, resultService,$filter, $location) {
        $scope.type = "company";
        $rootScope.activeCreateSurveyTab = false;
        $rootScope.activeSurveyTab = false;
        $rootScope.activeResultsTab = true;
        $scope.resultsview = true;
        $scope.participantview = false;
        $scope.locationview = false;
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
                $scope.totalResponse = [];
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

                        //$scope.totalResponse = $scop
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
            $scope.surveyName = data.name;
            $scope.data = [data.no_of_entries_count];
            $scope.series = ['No of entries', 'No of participants'];
            $scope.labels = [ data.no_of_participants_count ];
        };

        $scope.showBarGraphLocation = function (data) {
            $scope.surveyName = data.name;
            $scope.data = [data.entriesCount];
            $scope.series = ['No of questions', 'No of answers'];
            $scope.labels = [ data.participantCount ];
        };

        $scope.showBarGraphParticipant = function (data) {
            $scope.surveyName = data.name;
            $scope.data = [data.total_no_of_question];
            $scope.series = ['No of questions', 'No of answers'];
            $scope.labels = [ data.total_no_of_answer ];
        };
        $scope.showAllResults = function () {
            $scope.surveyName = "Results";
            $scope.data = [$scope.sumOfEntries];
            $scope.labels = [$scope.sumOfParticipants];
        };

        $scope.showByLocation = function () {
            resultService.getResultByLocation($scope.locationSelected).then(function (response) {
                if(response.data.success && response.data.status_code){
                    $scope.resultsview = false;
                    $scope.participantview = false;
                    $scope.locationview = true;
                    $scope.resultdatabylocation = response.data.data.locationResult;
                };
            });
        };

        $scope.showByParticipant = function () {
            resultService.getResultByParticipants($scope.participantSelected).then(function (response) {
                if(response.data.success && response.data.status_code){
                    $scope.resultsview = false;
                    $scope.participantview = true;
                    $scope.locationview = false;
                    $scope.resultdatabyparticipant = response.data.data.resultByParticipant;
                };
            });
        };

        $scope.showByCompany = function () {
            $scope.resultsview = true;
            $scope.participantview = false;
            $scope.locationview = false;
            results();
        };

    }]);


