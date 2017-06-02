angular.module('createsurvey', ['naif.base64', 'notification'])
    .controller("createSurveyCtrl" , ['$scope','$rootScope','createSurveyService','$location','CommonService','$timeout','dataGetService', '$routeParams','$filter',
        function ($scope, $rootScope, createSurveyService, $location, CommonService, $timeout, dataGetService, $routeParams, $filter) {
        function getSurveyDetailById(surveyId) {
            createSurveyService.getSurveyDetail(surveyId).then(function (response) {
                $scope.surveyDetails = response.data.data[0];
            }).catch(function (response) {
                console.log(response);
            });
        };
        
        function init() {
            if($location.path() == '/createsurvey') {
                $scope.surveyData = {};
                $scope.createSurveyTab = true;
                $scope.generalInfoTab = false;
            }

            if($routeParams.survey_id || $location.path() == '/surveymanagement'){
                $scope.categoryDetail = {
                    name : '',
                    description : '',
                    questions : []
                };

                $scope.questionDetail = {
                    question_title : null,
                    description : null,
                    options : []
                };

                $scope.categoryList = [];
                $scope.createSurveyTab = false;
                $scope.generalInfoTab = true;
                //getSurveyDetailById($routeParams.survey_id);
                getSurveyDetailById($routeParams.survey_id);
            }
        };

        $scope.createNewSurvey = function () {
            createSurveyService.createSurvey($scope.surveyData).then(function (response) {
                if(response.data.success && response.data.status_code == 200){
                    $timeout(function () {
                        dataGetService.success('Survey created successfully', 5000);
                    },50);
                    $rootScope.surveyId = response.data.data.id;
                    $location.path('/surveymanagement').search({'survey_id' : response.data.data.id});
                }
            }).catch(function (error) {
                console.log(error);
            });
        };
        
        $scope.addQuestionResponse = function () {
            if($scope.optionDetail == '') {
                console.log("Please enter options");
                return false;
            }
            $scope.questionDetail.options.push({response : $scope.optionDetail});
            $scope.optionDetail = '';
        };

        $scope.deleteQuestionResponse = function (indexNumber) {
            $scope.questionDetail.options.splice(indexNumber, 1);
        };
        
        $scope.addQuestion = function () {
            if($scope.questionDetail.question_title == '' || $scope.questionDetail.description == '' ||
                $scope.questionDetail.options.length == 0) {
                console.log("Please enter question detail");
                return false;
            }
            $scope.categoryDetail.questions.push($scope.questionDetail);
            $scope.questionDetail = {
                question_title : null,
                description : null,
                options : []
            };
        };
        
        $scope.deleteQuestion = function (indexNumber) {
            $scope.categoryDetail.questions.splice(indexNumber, 1);
        };

        $scope.addCategory = function () {
            if($scope.categoryDetail.name == '' || $scope.categoryDetail.description =='' || $scope.categoryDetail.questions.length == 0) {
                console.log("Please fill all detail for category.");
                return false;
            }
            $scope.categoryList.push($scope.categoryDetail);
            $scope.categoryDetail = {
                name : '',
                description : '',
                questions : []
            };
            console.log($scope.categoryList);
        };
        
        $scope.deleteCategory = function (indexNumber) {
            console.log(indexNumber);
            $scope.categoryList.splice(indexNumber, 1);
        };
        
        $scope.saveSurveyDetail = function () {
            console.log($scope.categoryList);
        };

        init();
    }]);
