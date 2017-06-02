angular.module('survey')
    .factory("surveyOverviewservice" , ['$q','$http','dataGetService','$timeout','$location', function ($q,$http, dataGetService, $timeout,$location) {
        return {
            getSurveyData: getSurveyData,
            deleteItem: deleteItem,
            getParticipantData: getParticipantData,
            addParticipant: addParticipant,
            updateParticipant: updateParticipant,
            deleteParticipant: deleteParticipant
        }

        function getSurveyData(){
            return $http({
                method: 'GET',
                url: 'http://aliens.dev.easternenterprise.com/api/survey/List'
            }).success(function (response) {
                return response;
            }).error(function (response) {
                console.log('XHR Failed for getting survey list');
                if(response.message == 'Unathenticated'){
                    $location.path('/');
                }
            })
        }

        function deleteItem(data){
            return $http({
                method: 'DELETE',
                url: 'http://aliens.dev.easternenterprise.com/api/survey/delete?id=' + data
            }).success(function (response) {
                return response;
            }).error(function (response) {
                console.log('XHR Failed for deleting survey');
                $timeout(function () {
                    dataGetService.errors(response.message, 1500);
                },500);
                if(response.message == 'Unathenticated'){
                    $location.path('/');
                }
            })
        }

        function deleteParticipant(data){
            return $http({
                method: 'DELETE',
                url: 'http://aliens.dev.easternenterprise.com/api/participant/delete?id=' + data
            }).success(function (response) {
                return response;
            }).error(function (response) {
                console.log('XHR Failed for deleting participant');
                $timeout(function () {
                    dataGetService.errors(response.message, 1500);
                },500);
                if(response.message == 'Unathenticated'){
                    $location.path('/');
                }
            })
        }

        function getParticipantData(data){
            return $http({
                method: 'GET',
                url: 'http://aliens.dev.easternenterprise.com/api/participants/List?survey_id=' + data
            }).success(function (response) {
                return response;
            }).error(function (response) {
                console.log('XHR Failed for getting participant data');
                if(response.message == 'Unathenticated'){
                    $location.path('/');
                }
            })
        }

        function addParticipant(data){
            return $http({
                method: 'POST',
                url: 'http://aliens.dev.easternenterprise.com/api/participant/create?survey_id=' + data.id,
                data: data
            }).success(function (response) {
                return response;
            }).error(function (response) {
                console.log('XHR Failed for creating participant');
                if(response.message == 'Unathenticated'){
                    $location.path('/');
                }
            })
        }

        function updateParticipant(data, id){
            return $http({
                method: 'PUT',
                url: 'http://aliens.dev.easternenterprise.com/api/participant/update?id=' + id,
                data: data
            }).success(function (response) {
                return response;
            }).error(function (response) {
                console.log('XHR Failed for updating participant');
                $timeout(function () {
                    dataGetService.errors(response.message, 1500);
                },500);
                if(response.message == 'Unathenticated'){
                    $location.path('/');
                }
            })
        }

    }]);