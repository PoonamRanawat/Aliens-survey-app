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

        $scope.createSurveyTab = true;
        if($location.path() == '/createsurvey'){
            $scope.createSurveyTab = true;
            $scope.generalInfoTab = false;
        }
        if($location.path() == '/surveymanagement'){
            $scope.generalInfoTab = true;
            $scope.createSurveyTab = false;
        }
        function htmlToPlaintext(text) {
            return text ? String(text).replace(/<[^>]+>/gm, '') : '';
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
                            dataGetService.success('Survey updated successfully', 1500);
                        },200);
                        $location.path('/surveyoverview');
                    }
                })
            } else {
                //create call
                createSurveyService.createSurvey(request).then(function (response) {
                    if(response.data.success && response.data.status_code == 200){
                        $timeout(function () {
                            dataGetService.success('Survey created successfully', 1500);
                        },200);
                        $location.path('/surveyoverview');
                    }
                });
            }
        }

    }]);
