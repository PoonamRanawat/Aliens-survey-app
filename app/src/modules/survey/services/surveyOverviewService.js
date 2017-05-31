angular.module('survey')
    .factory("surveyOverviewservice" , ['$q','$http','dataGetService','$timeout', function ($q,$http, dataGetService, $timeout) {
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
            }).error(function () {
                console.log('XHR Failed for getting survey list');
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
            })
        }

        function deleteParticipant(data){
            return $http({
                method: 'DELETE',
                url: 'http://aliens.dev.easternenterprise.com/api/participant/delete?id=' + data
            }).success(function (response) {
                return response;
            }).error(function (response) {
                console.log('XHR Failed for deleting survey');
                $timeout(function () {
                    dataGetService.errors(response.message, 1500);
                },500);
            })
        }

        function getParticipantData(data){
            return $http({
                method: 'GET',
                url: 'http://aliens.dev.easternenterprise.com/api/participants/List?survey_id=' + data
            }).success(function (response) {
                return response;
            }).error(function () {
                console.log('XHR Failed for deleting survey');
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
            })
        }

    }]);