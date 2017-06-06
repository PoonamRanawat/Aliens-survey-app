angular.module('results', ['notification', 'chart.js'])
    .controller("resultController" , ['$scope','$rootScope','dataGetService','$timeout','resultService','$filter', function ($scope,$rootScope, dataGetService, $timeout, resultService,$filter) {

        $rootScope.activeCreateSurveyTab = false;
        $rootScope.activeSurveyTab = false;
        $rootScope.activeResultsTab = true;
        Array.prototype.unique = function() {
            return this.filter(function (value, index, self) {
                return self.indexOf(value) === index;
            });
        };
        function results() {
            resultService.getResultsData().then(function (response) {
                $scope.resultdata = response.data.data;
                $scope.locations = [];
                $scope.participants = [];
                $scope.totalNoOfEntries = [];
                $scope.totalNoOfParticipants = [];
                if($scope.resultdata){
                    angular.forEach(_.uniqBy($scope.resultdata, 'location'), function (item) {
                        return $scope.locations.push(item.location);
                    });
                    angular.forEach(_.uniqBy($scope.resultdata, 'participant_name'), function (item) {
                        return $scope.participants.push(item.participant_name);
                    });
                    angular.forEach($scope.resultdata, function (item) {
                        $scope.totalNoOfEntries.push(item.no_of_entries);
                        $scope.totalNoOfParticipants.push(item.no_of_participants);
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

        $scope.showBarGraph = function (data) {
            $scope.data = [data.no_of_entries];
            $scope.series = ['No of entries', 'No of participants'];
            $scope.labels = [ data.no_of_participants ];
        };
        $scope.showAllResults = function () {
            $scope.data = [$scope.sumOfEntries];
            $scope.labels = [$scope.sumOfParticipants];
        };

        $scope.showResults = function (data) {
            alert(data);
        };
    }]);


