angular.module('createsurvey', ['naif.base64', 'notification'])
    .controller("createSurveyCtrl" , ['$scope','$rootScope','createSurveyService','$location','CommonService','$timeout','dataGetService', '$routeParams','toaster', '$filter',
        function ($scope, $rootScope, createSurveyService, $location, CommonService, $timeout, dataGetService, $routeParams, toaster, $filter) {

            function goToSurveyManageTab() {
                $("#surveyManageTab").removeClass("disabled-tab").off('click');
                $("#generalInfoTab").removeClass("active");
                $("#surveyManageTab").addClass("active");

                $("#generalInfoContent").removeClass("in active");
                $("#surveyManageContent").addClass("in active");
            };

            function getSurveyDetail(surveyId) {
                createSurveyService.getSurveyDetail(surveyId).then(function (response) {
                    var surveyData = response.data.data[0];
                    $scope.categoryList = surveyData.category;
                    $scope.surveyData = {
                        id : surveyData.id,
                        logo_path : null,
                        logo_path_url : surveyData.logo_path,
                        name : surveyData.name,
                        description : surveyData.description,
                        message : surveyData.message
                    };
                }).catch(function (error) {
                    toaster.clear();
                    toaster.error(error);
                });
            }

            function init() {
                $rootScope.activeCreateSurveyTab = true;
                $rootScope.activeSurveyTab = false;
                $rootScope.activeResultsTab = false;

                $scope.isUpdate = false;
                $scope.surveyId = null;
                $scope.surveyData = {};
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

                if($location.path() == '/edit-survey') {
                    if(typeof $rootScope.editSurveyId == 'undefined') {
                        $location.path('/surveyoverview');
                    }
                    $scope.isUpdate = true;
                    $scope.surveyId = $rootScope.editSurveyId;
                    getSurveyDetail($scope.surveyId);
                }

            };

            function createSurveyDetail() {
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

            function updateSurveyDetail() {
                createSurveyService.updateSurveyInfo($scope.surveyData, $scope.surveyId).then(function (response) {
                    if(response.data.success && response.data.status_code == 200){
                        $timeout(function () {
                            dataGetService.success('Survey updated successfully', 5000);
                        },50);
                        goToSurveyManageTab();
                    }
                }).catch(function (error) {
                    toaster.clear();
                    toaster.error(error);
                });
            };

            $scope.createNewSurvey = function () {
                if($scope.isUpdate) {
                    updateSurveyDetail();
                } else {
                    createSurveyDetail();
                }

            };

            $scope.addQuestionResponse = function (response) {
                toaster.clear();
                if(response == '') {
                    toaster.error("Please enter response.");
                    return false;
                }
                $scope.questionDetail.option.push({id : null, option : response});
                angular.element(".responseData").val('');
            };

            $scope.deleteQuestionResponse = function (indexNumber) {
                $scope.questionDetail.option.splice(indexNumber, 1);
            };

            $scope.showQuestion = false;
            $scope.showQuestionDiv = function () {
                $scope.questionDetail = {
                    question_title : null,
                    description : null,
                    option : []
                };
                $scope.showQuestion = true;
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
                $scope.showQuestion = false;
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
                console.log($scope.categoryDetail);
                $scope.categoryList.push($scope.categoryDetail);
                $scope.categoryDetail = {
                    name : '',
                    description : '',
                    question : []
                };
                console.log($scope.categoryList);
            };

            $scope.deleteCategory = function (indexNumber, categoryObjDetail) {
                toaster.clear();
                if(typeof categoryObjDetail.id != 'undefined') {
                    createSurveyService.deleteCategory(categoryObjDetail.id).then(function (response) {
                        $scope.categoryList.splice(indexNumber, 1);
                        toaster.success("Category detail removed successfully.");
                    }).catch(function (error) {
                        toaster.error(error);
                    });
                } else {
                    $scope.categoryList.splice(indexNumber, 1);
                    toaster.success("Category detail removed successfully.");
                }
            };

            $scope.saveSurveyDetail = function () {
                if($scope.categoryList.length == 0) {
                    var iscategoryAdded = $scope.addCategory();
                    if(iscategoryAdded == false) {
                        return false;
                    }
                }
                if($scope.surveyId == null) {
                    toaster.clear();
                    toaster.error("Please create survey first.");
                    return false;
                }
                createSurveyService.saveSurveyInfo($scope.categoryList, $scope.surveyId).then(function (response) {
                    if(response.data.success && response.data.status_code == 200){
                        $timeout(function () {
                            dataGetService.success('Survey Category saved successfully', 5000);
                            $location.path("/surveyoverview");
                        },50);
                    }
                }).catch(function (error) {
                    toaster.clear();
                    toaster.error(error);
                });
            };

            $scope.editCategory = function (categoryDetail, indexNumber) {
                $scope.categoryDetail = categoryDetail;
            };

            $scope.deleteQuestionFromAPI = function (categoryId, indexNumber, questionId) {
                createSurveyService.deleteCategory(questionId).then(function (response) {
                    $filter('filter')($scope.categoryList, {id: parseInt(categoryId)}, true)[0].question.splice(indexNumber, 1);
                }).catch(function (error) {
                    toaster.clear();
                    toaster.error(error);
                });
            };

            //Remove category option from category Listing.
            $scope.removeResponseFromList = function (optionIndex, questionIndex, categoryIndex) {
                var optionId = $scope.categoryList[categoryIndex].question[questionIndex].option[optionIndex].id;
                if(optionId == null) {
                    $scope.categoryList[categoryIndex].question[questionIndex].option.splice(optionIndex, 1)
                    toaster.clear();
                    toaster.success("Option deleted successfully.");
                    return true;
                }

                createSurveyService.deleteQuestionOption(optionId).then(function (response) {
                    $scope.categoryList[categoryIndex].question[questionIndex].option.splice(optionIndex, 1)
                    toaster.clear();
                    toaster.success("Option deleted successfully.");
                }).catch(function (error) {
                    toaster.clear();
                    toaster.error(error);
                });
            };

            //Add category option from category Listing.
            $scope.addResponseFromCategoryListing = function (response, questionIndex, categoryIndex) {
                toaster.clear();
                if(response == '') {
                    toaster.error("Please enter response.");
                    return false;
                }
                $scope.categoryList[categoryIndex].question[questionIndex].option.push({id : null, option : response});
                $scope.questionResponse = '';
                angular.element(".responseModel").val("");
            };
            
            $scope.showQuestionDivInListing = function (questionBlock) {
                $scope.questionDetail = {
                    question_title : null,
                    description : null,
                    option : []
                };
                angular.element("#questionBlock"+questionBlock).show();
                angular.element("#questionButtonDiv"+questionBlock).hide();
            };

            $scope.saveQuestionInListing = function (categoryIndex) {
                toaster.clear();
                if($scope.questionDetail.question_title == '' || $scope.questionDetail.description == '' ||
                    $scope.questionDetail.option.length == 0) {
                    toaster.error("Question title, description, response are required field.");
                    return false;
                }

                $scope.categoryList[categoryIndex].question.push($scope.questionDetail);
                toaster.success("Question added to category successfully.");
                $scope.questionDetail = {
                    question_title : null,
                    description : null,
                    option : []
                };
                angular.element("#questionBlock"+categoryIndex).hide();
                angular.element("#questionButtonDiv"+categoryIndex).show();
            };

            init();
        }]);