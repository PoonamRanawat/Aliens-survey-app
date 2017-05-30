angular.module('user', [])
    .controller("userController" , ['$scope','userService' ,'$rootScope', function ($scope, userService, $rootScope) {
        $scope.textsearch = "";
        function userlist() {
            $scope.data = userService.getUserData().then(function (response) {
                $rootScope.listdata = response.data.data;
            });
        }
        userlist();

        $scope.addEmployees = function (dataEntered) {
            if (dataEntered == undefined || dataEntered == "undefined" || dataEntered == "null" || dataEntered == null) {
                return alert("Please enter data");
            } else {
                validateDataEntered(dataEntered, true);
            }
            $('#addUserForm').modal('hide');
        };

        function validateDataEntered(dataEntered, flag){
            if (!dataEntered.name) {
                alert("Please enter name");
                return false;
            }
            if (dataEntered.password) {
                if (dataEntered.password.length < 8) {
                    alert("Please enter more than 8 characters");
                    return false;
                }
            } else {
                alert("Please enter password");
                return false;
            }
            if (!dataEntered.company) {
                alert("Please enter company");
                return false;
            }
            if (!dataEntered.email) {
                alert("Please enter valid email");
                return false;
            }
            if(flag == true){
                userService.addUser(dataEntered).then(function (response) {
                    if(response.data.success && response.data.status_code == 200){
                        userlist();
                    }
                });
            } else if( flag == false){
                delete dataEntered.created_at;
                delete dataEntered.updated_at;
                delete dataEntered.user_type;
                delete dataEntered.status;
                delete dataEntered.survey_count;
                userService.updateUser(dataEntered).then(function (response) {
                    userlist();
                });
            }
            $scope.close = function () {
                $modalInstance.dismiss('close');
            };
            $('#addUserForm').on('hidden.bs.modal', function () {
                $(this).find("input,textarea,select").val('').end();
            });
        }

        //edit data - start
        $scope.open = function (data) {
            $rootScope.dataToEdit = jQuery.extend({}, data);
        };
        //edit data - end
        $scope.deleteUser = function (data) {
            $rootScope.userTodelete = data.id;
        }
        //delete user - start
        $scope.delete = function (data) {

            userService.deleteUser(data).then(function (response) {
                if(response.data.success){
                    $('#myDeleteModal').modal('hide');
                    userlist();
                }
                return response.data;
            })
        };
        //delete user - end
        //update data - start
        $scope.updateEmployees = function (dataToEdit) {
            if (dataToEdit == undefined || dataToEdit == "undefined" || dataToEdit == "null" || dataToEdit == null) {
                return alert("Please enter data");
            } else {
                validateDataEntered(dataToEdit, false);
            }
            $('#editUserModal').modal('hide');
            $('#editUserModal').on('hidden.bs.modal', function () {
                $(this).find("input,textarea,select").val('').end();
            });
        };
        //update data - end

        //Function to filter name and city from listing - start
        $scope.filterFunction = function (element) {
            if (element.name.match(new RegExp("(" + $scope.textsearch + ")", "i")) ? true : false || element.email.match(new RegExp("(" + $scope.textsearch + ")", "i")) ? true : false) {
                return element;
            };
        };
        //Function to filter name and city from listing - end

    }]);


