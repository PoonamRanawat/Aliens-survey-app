angular.module('results')
    .factory("resultService" , ['$q','$http','dataGetService','$timeout','$location', function ($q,$http, dataGetService, $timeout,$location) {
        return {
            getResultsData: getResultsData,
            getLocations: getLocations,
            getResultByLocation: getResultByLocation,
            getParticipants: getParticipants,
            getResultByParticipants: getResultByParticipants,
            getGraphData: getGraphData,
            getGraphDataByLocation: getGraphDataByLocation,
            getGraphDataByParticipant: getGraphDataByParticipant
        }

        function getResultsData() {
            return $http({
                method: 'GET',
                url: 'http://aliens.dev.easternenterprise.com/api/survey/result',
            }).success(function (response) {
                return response;
            }).error(function (response) {
                console.log('XHR Failed for creating survey');
                $timeout(function () {
                    dataGetService.errors(response.message, 1500);
                },500);
                if(response.message == 'Unathenticated'){
                    $location.path('/');
                }
            })
        };

        function getLocations() {
            return $http({
                method: 'GET',
                url: 'http://aliens.dev.easternenterprise.com/api/participant/location',
            }).success(function (response) {
                return response;
            }).error(function (response) {
                console.log('XHR Failed for creating survey');
                $timeout(function () {
                    dataGetService.errors(response.message, 1500);
                },500);
                if(response.message == 'Unathenticated'){
                    $location.path('/');
                }
            })
        };

        function getParticipants() {
            return $http({
                method: 'GET',
                url: 'http://aliens.dev.easternenterprise.com/api/participant/name',
            }).success(function (response) {
                return response;
            }).error(function (response) {
                console.log('XHR Failed for creating survey');
                $timeout(function () {
                    dataGetService.errors(response.message, 1500);
                },500);
                if(response.message == 'Unathenticated'){
                    $location.path('/');
                }
            })
        };

        function getResultByLocation(name) {
            return $http({
                method: 'GET',
                url: 'http://aliens.dev.easternenterprise.com/api/survey/result?location=' + name,
            }).success(function (response) {
                return response;
            }).error(function (response) {
                console.log('XHR Failed for creating survey');
                $timeout(function () {
                    dataGetService.errors(response.message, 1500);
                },500);
                if(response.message == 'Unathenticated'){
                    $location.path('/');
                }
            })
        };

        function getResultByParticipants(name) {
            return $http({
                method: 'GET',
                url: 'http://aliens.dev.easternenterprise.com/api/survey/result?participant=' + name,
            }).success(function (response) {
                return response;
            }).error(function (response) {
                console.log('XHR Failed for creating survey');
                $timeout(function () {
                    dataGetService.errors(response.message, 1500);
                },500);
                if(response.message == 'Unathenticated'){
                    $location.path('/');
                }
            })
        };

        function getGraphData(data) {
            return $http({
                method: 'GET',
                url: 'http://aliens.dev.easternenterprise.com/api/result?survey_id=' + data,
            }).success(function (response) {
                return response;
            }).error(function (response) {
                console.log('XHR Failed for getting graph data');
                $timeout(function () {
                    dataGetService.errors(response.message, 1500);
                },500);
                if(response.message == 'Unathenticated'){
                    $location.path('/');
                }
            })
        };

        function getGraphDataByLocation(id, location) {
            return $http({
                method: 'GET',
                url: 'http://aliens.dev.easternenterprise.com/api/result/location?survey_id=' + id + '&location=' + location
            }).success(function (response) {
                return response;
            }).error(function (response) {
                console.log('XHR Failed for getting graph data');
                $timeout(function () {
                    dataGetService.errors(response.message, 1500);
                },500);
                if(response.message == 'Unathenticated'){
                    $location.path('/');
                }
            })
        };

        function getGraphDataByParticipant(id, participant) {
            return $http({
                method: 'GET',
                url: 'http://aliens.dev.easternenterprise.com/api/result/participant?survey_id=' + id + '&part_id=' + participant
            }).success(function (response) {
                return response;
            }).error(function (response) {
                console.log('XHR Failed for getting graph data');
                $timeout(function () {
                    dataGetService.errors(response.message, 1500);
                },500);
                if(response.message == 'Unathenticated'){
                    $location.path('/');
                }
            })
        };


    }]);