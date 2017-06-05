angular.module('createsurvey', ['naif.base64', 'notification'])
    .controller("createSurveyCtrl" , ['$scope','$rootScope','createSurveyService','$location','CommonService','$timeout','dataGetService', '$routeParams','toaster',
        function ($scope, $rootScope, createSurveyService, $location, CommonService, $timeout, dataGetService, $routeParams, toaster) {

        function goToSurveyManageTab() {
            $("#surveyManageTab").removeClass("disabled-tab").off('click');
            $("#generalInfoTab").removeClass("active");
            $("#surveyManageTab").addClass("active");

            $("#generalInfoContent").removeClass("in active");
            $("#surveyManageContent").addClass("in active");
        };
        
        function init() {
            $scope.surveyId = null;
            $scope.surveyData = {};
            $scope.createSurveyTab = true;
            $scope.generalInfoTab = false;
            $scope.categoryDetail = {
                name : '',
                description : '',
                question : []
            };

            $scope.questionDetail = {
                question_title : null,
                description : null,
                option : []
            };

            $scope.categoryList = [];
            $scope.createSurveyTab = false;
            $scope.generalInfoTab = true;
        };

        $scope.createNewSurvey = function () {
            createSurveyService.createSurvey($scope.surveyData).then(function (response) {
                if(response.data.success && response.data.status_code == 200){
                    $timeout(function () {
                        dataGetService.success('Survey created successfully', 5000);
                    },50);
                    $scope.surveyId = response.data.data.id;
                    goToSurveyManageTab();
                }
            }).catch(function (error) {
                toaster.clear();
                toaster.error(error);
            });
        };
        
        $scope.addQuestionResponse = function () {
            toaster.clear();
            if($scope.optionDetail == '') {
                toaster.error("Please enter response.");
                return false;
            }
            $scope.questionDetail.option.push({id : null, option : $scope.optionDetail});
            $scope.optionDetail = '';
        };

        $scope.deleteQuestionResponse = function (indexNumber) {
            $scope.questionDetail.option.splice(indexNumber, 1);
        };
        
        $scope.addQuestion = function () {
            toaster.clear();
            if($scope.questionDetail.question_title == '' || $scope.questionDetail.description == '' ||
                $scope.questionDetail.option.length == 0) {
                toaster.error("Question title, description, response are required field.");
                return false;
            }
            $scope.categoryDetail.question.push($scope.questionDetail);
            toaster.success("Question added to category successfully.");
            $scope.questionDetail = {
                question_title : null,
                description : null,
                option : []
            };
        };
        
        $scope.deleteQuestion = function (indexNumber) {
            $scope.categoryDetail.question.splice(indexNumber, 1);
            toaster.success("Question removed from category successfully.");
        };

        $scope.addCategory = function () {
            toaster.clear();
            if($scope.categoryDetail.name == '' || $scope.categoryDetail.description =='' || $scope.categoryDetail.question.length == 0) {
                toaster.clear();
                toaster.error("Name, Description, questions are required field.");
                return false;
            }
            $scope.categoryList.push($scope.categoryDetail);
            $scope.categoryDetail = {
                name : '',
                description : '',
                question : []
            };
            console.log($scope.categoryList);
        };
        
        $scope.deleteCategory = function (indexNumber) {
            $scope.categoryList.splice(indexNumber, 1);
            toaster.success("Category detail removed successfully.");
        };
        
        $scope.saveSurveyDetail = function () {
            console.log($scope.categoryList);
            createSurveyService.saveSurveyInfo($scope.categoryList, $scope.surveyId).then(function (response) {
                if(response.data.success && response.data.status_code == 200){
                    $timeout(function () {
                        dataGetService.success('Survey Category saved successfully', 5000);
                    },50);
                }
            }).catch(function (error) {
                toaster.clear();
                toaster.error(error);
            });
        };

        init();
    }]);
