angular.module('viewsurvey', ['notification','ngMaterial', 'ngMessages'])
    .controller("viewSurveyController" , ['$scope','viewSurveyService', function ($scope, viewSurveyService) {
        $scope.resultdata = [];
        $scope.category = [];
        function resultView() {
           viewSurveyService.getSurveyDetails().then( function (response) {
               if(response.data.success && response.data.status_code == 200){
                   console.log(response.data.data);
                   $scope.resultdata =  response.data.data[0];
               }
            });
        };

        resultView();
        // $scope.selected_ids = [];
        // $scope.submitAnswers = function() {
        //     angular.forEach($scope.resultdata.category, function(question) {
        //        angular.forEach(question.question, function (option) {
        //             //angular.forEach(option, function (id) {
        //                     $scope.selected_ids.push(option.selectedValue);
        //             //});
        //         });
        //     });
        // };

        $scope.selected = [];
        $scope.category = $scope.resultdata.category;

        for (var i = 0; i < $scope.category.length; i++) {
            for (var k = 0; k < $scope.category[i].question.length; k++) {
                var question = $scope.category[i].question[k];
                $scope.selected.push(question);
            }
        }

        $scope.selected_ids = [];
        $scope.submitAnswers = function () {

            angular.forEach($scope.selected, function (option) {
                $scope.selected_ids.push(option.selected_id);
            });

        }

    }]);
