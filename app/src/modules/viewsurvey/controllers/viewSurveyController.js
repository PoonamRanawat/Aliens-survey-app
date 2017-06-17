angular.module('viewsurvey', ['notification'])
    .controller("viewSurveyController" , ['$scope','viewSurveyService','$location','$routeParams','dataGetService','$timeout','$rootScope', function ($scope, viewSurveyService,$location, $routeParams, dataGetService,$timeout, $rootScope) {
        $rootScope.loggedInPersonName =localStorage.getItem("loggedInPersonName");
        $scope.resultdata = [];
        $scope.category = [];
        $scope.disabledButton = false;
        function resultView() {
           viewSurveyService.getSurveyDetails($routeParams.survey_id, $routeParams.participantid).then( function (response) {
               if(response.data.success && response.data.status_code == 200){
                   $scope.surveyDetail = response.data.data[0];
                   $scope.resultdata =  response.data.data[0].category;
                   $scope.selected = [];
                   for (var i = 0; i < $scope.resultdata.length; i++) {
                       for (var k = 0; k < $scope.resultdata[i].question.length; k++) {
                           var question = $scope.resultdata[i].question[k];
                           $scope.selected.push(question);
                       }
                   }
               };
            }).catch(function (error) {
               $scope.disabledButton = true;
           });
        };

        resultView();
        $scope.obj = [];


        $scope.submitAnswers = function () {
            angular.forEach($scope.selected, function (option) {
                if(option.selected_id){
                    var data = {
                        "question_id" : option.id,
                        "option_id": option.selected_id.id,
                        "ans": option.selected_id.option
                    };
                    $scope.obj.push(data);
                }
            });

            var request = {
                "survey_id": $routeParams.survey_id,
                "participant_id": $routeParams.participantid,
                "answer": $scope.obj
            };

            //validateAnswers(request);
            viewSurveyService.submitAnswers(request).then(function (response) {
                if(response.data.success && response.data.status_code == 200){
                    $timeout(function () {
                        dataGetService.success('Survey submitted successfully', 5000);
                    },50);
                };
            });
        };


    }]);
