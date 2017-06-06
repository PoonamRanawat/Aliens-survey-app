angular.module('createsurvey', ['naif.base64', 'notification'])
    .controller("createSurveyCtrl" , ['$scope','$rootScope','createSurveyService','$location','CommonService','$timeout','dataGetService', function ($scope, $rootScope, createSurveyService, $location, CommonService, $timeout, dataGetService) {
        editSurveyData();

        if(CommonService.getFlag())
        {
            $scope.dataToEditSurvey='';
        }else{
            editSurveyData();
            CommonService.setFlag(true);
        }

        function editSurveyData() {
            $scope.dataToEditSurvey = CommonService.getData();
        }
        $rootScope.activeCreateSurveyTab = true;
        $rootScope.activeSurveyTab = false;
        $rootScope.activeResultsTab = false;

        $scope.createSurveyTab = true;
        if($location.path() == '/createsurvey'){
            $scope.createSurveyTab = true;
            $scope.generalInfoTab = false;
        }
        if($location.path() == '/surveymanagement'){
            $scope.generalInfoTab = true;
            $scope.createSurveyTab = false;
        }
        $scope.cancelsurvey = function () {
            $scope.dataToEditSurvey = '';
        };

        $scope.createSurvey = function (file, name , desc , msg , id) {
            var request = {
                "logo_path": file,
                "name": name,
                "description": desc,
                "message": msg

            }
            if(id){
                //update call
                request ['id'] =  id;
                createSurveyService.updateSurvey(request).then(function (response) {
                    if(response.data.success && response.data.status_code == 200){
                        $timeout(function () {
                            dataGetService.success('Survey updated successfully', 5000);
                        },50);
                        $location.path('/surveymanagement');
                    }
                })
            } else {
                //create call
                createSurveyService.createSurvey(request).then(function (response) {
                    if(response.data.success && response.data.status_code == 200){
                        $timeout(function () {
                            dataGetService.success('Survey created successfully', 5000);
                        },50);
                        $rootScope.createdSurvey = response.data.data;
                        $location.path('/surveymanagement');
                    }
                });
            }
        }

        $scope.saveSurvey = function (data) {
            var request = [{
                "category_name": data.category_name,
                "cat_desc": data.cat_desc,
                "questions": [{
                    "question_title": data.question_title,
                    "question_desc": data.question_desc,
                    "options" : "great",
                    "correct_answer": "great"
                    }
                ]
            }]
            // createSurveyService.saveSurvey(request).then(function (response) {
            //     if(response.data.success && response.data.status_code == 200){
            //         $timeout(function () {
            //             dataGetService.success('Survey saved successfully', 5000);
            //         },50);
            //         $location.path('/surveyoverview');
            //     }
            // });
        };
        $scope.addCategory = function () {
            var count = $(".add-category-body");
            var cnt = count.length + 1;
            $('.add-category-body:last-child').clone({withDataAndEvents: true}).insertAfter("div.add-category-body:last").find("form").attr("id", "form" + cnt);
        };
        
        $scope.deleteCategory = function (myparent) {
            myparent = $(event.target).parent().parent();
            // var formToDelete = (myparent[0].id);
            // var formToDelete = formToDelete.replace(/"/g, "");
            // $("#formToDelete").remove();
            //$("form").remove("#formToDelete");
        };
    }]);
