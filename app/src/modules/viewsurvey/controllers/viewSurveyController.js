angular.module('viewsurvey', ['notification'])
    .controller("viewSurveyController" , ['$scope','viewSurveyService','$location','$routeParams','dataGetService','$timeout', function ($scope, viewSurveyService,$location, $routeParams, dataGetService,$timeout) {
        $scope.resultdata = [];
        $scope.category = [];
        $scope.disabledButton = false;
        console.log($scope.disabledButton);
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

        $scope.selected_ids = [];
        $scope.selected_option = [];

        $scope.submitAnswers = function () {
            angular.forEach($scope.selected, function (option) {
                if(option.selected_id){
                    $scope.selected_ids.push(option.id);
                    $scope.selected_option.push(option.selected_id);
                }
            });

            var $array1 = $scope.selected_ids;
            // for(var i=0; $array1.length> i;i++){
            //     $array1[i].toString();
            // }
            var $array2 = $scope.selected_option;
            var obj = {};

            for(var i=0,len=$array1.length; i < len ;i++) {
                obj[$array1[i]] = $array2[i];
            }

            var request = {
                "survey_id": $routeParams.survey_id,
                "participant_id": $routeParams.participantid,
                "answer": obj
            }
            //validateAnswers(request);
            viewSurveyService.submitAnswers(request).then(function (response) {
                if(response.data.success && response.data.status_code == 200){
                    $timeout(function () {
                        dataGetService.success('Survey submitted successfully', 5000);
                    },50);
                };
            });
        };

        // function validateAnswers(request) {
        //     if(request.answer){
        //         $timeout(function () {
        //             dataGetService.errors('Please select answers', 5000);
        //         },50);
        //         //toaster.error('Please select answers');
        //     } else {
        //         viewSurveyService.submitAnswers(request).then(function (response) {
        //             return response.data;
        //         });
        //     }
        // };
    }]);
