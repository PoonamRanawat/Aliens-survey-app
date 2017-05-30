angular.module('createsurvey', ['naif.base64'])
    .controller("createSurveyCtrl" , ['$scope','$rootScope','createSurveyService','$location','CommonService', function ($scope, $rootScope, createSurveyService, $location, CommonService) {
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
            $location.path('/surveyoverview');
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
                        $location.path('/surveymanagement');
                    }
                })
            } else {
                //create call
                createSurveyService.createSurvey(request).then(function (response) {
                    if(response.data.success && response.data.status_code == 200){
                        $location.path('/surveymanagement');
                    }
                });
            }
        }

    }]);
