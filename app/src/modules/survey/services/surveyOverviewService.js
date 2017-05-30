angular.module('survey')
    .factory("surveyOverviewservice" , ['$q','$http', function ($q,$http) {
        return {
            getSurveyData: getSurveyData,
            deleteItem: deleteItem,
            getParticipantData: getParticipantData,
            addParticipant: addParticipant,
            updateParticipant: updateParticipant
        }


        // function getSurveyData() {
        //     return $http({
        //         method: 'GET',
        //         url: 'http://aliens.dev.easternenterprise.com/api/users/List',
        //     }).success(function (response) {
        //         return response;
        //     }).error(function () {
        //         console.log('XHR Failed for getting list of users');
        //     })
        // }

        // function getSurveyData(){
        //     var defer = $q.defer();
        //     $http.get('src/modules/survey/assets/surveydata.json').then(function (data) {
        //             defer.resolve(data);
        //         }
        //         , function () {
        //             defer.reject('could not find token.json');
        //         });
        //     return defer.promise;
        // }

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
            }).error(function () {
                console.log('XHR Failed for deleting survey');
            })
        }

        // function getParticipantData(){
        //     var defer = $q.defer();
        //     $http.get('src/modules/survey/assets/participantData.json').then(function (data) {
        //             defer.resolve(data);
        //         }
        //         , function () {
        //             defer.reject('could not find token.json');
        //         });
        //     return defer.promise;
        // }

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
            }).error(function () {
                console.log('XHR Failed for creating participant');
            })
        }

        function updateParticipant(data){
            return $http({
                method: 'PUT',
                url: 'http://aliens.dev.easternenterprise.com/api/participant/update?survey_id=' + data.id,
                data: data
            }).success(function (response) {
                return response;
            }).error(function () {
                console.log('XHR Failed for updating participant');
            })
        }

    }]);