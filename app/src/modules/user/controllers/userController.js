angular.module('user', ['notification'])
    .controller("userController" , ['$scope','userService' ,'$rootScope','CommonService','dataGetService','$timeout', function ($scope, userService, $rootScope, CommonService, dataGetService, $timeout) {
        $scope.textsearch = "";

        function userlist() {
            $scope.data = userService.getUserData().then(function (response) {
                $rootScope.listdata = response.data.data;

            });
        }
        userlist();

        $scope.addEmployees = function (dataEntered) {
            if (dataEntered == undefined || dataEntered == "undefined" || dataEntered == "null" || dataEntered == null) {
                $timeout(function () {
                    dataGetService.errors('Please enter data', 1500);
                },500);
            } else {
                validateDataEntered(dataEntered, true);
            }

        };

        function validateDataEntered(dataEntered, flag){
            if (!dataEntered.name) {
                $timeout(function () {
                    dataGetService.errors('Please enter name', 1500);
                },500);
            }
            else if (!dataEntered.email) {
                $timeout(function () {
                    dataGetService.errors('Please enter valid email', 1500);
                },500);
            }
            else if (!dataEntered.company) {
                $timeout(function () {
                    dataGetService.errors('Please enter company', 1500);
                },500);
            }
            else if (!dataEntered.password) {
                $timeout(function () {
                    dataGetService.errors('Please enter password', 1500);
                },500);
            }
            if(flag == true){
                userService.addUser(dataEntered).then(function (response) {
                    if(response.data.success && response.data.status_code == 200){
                        $timeout(function () {
                            dataGetService.success('User added successfully', 1500);
                        },200);
                        $('#addUserForm').modal('hide');
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
                    $timeout(function () {
                        dataGetService.success('User updated successfully', 1500);
                    },200);
                    $('#editUserModal').modal('hide');
                    userlist();
                });
            }
        }
        $scope.closeForm = function () {
            $('#addUserForm.modal').on('hidden.bs.modal', function () {
               $(this).find("input,textarea,select").val('').end();
            });
            $('#addUserForm').modal('hide');
        };

        //edit data - start
        $scope.open = function (data) {
            CommonService.setData(data);
            editData();
        };

        if(CommonService.getFlag())
        {
            $scope.dataToEdit='';
        }else{
            editData();
            CommonService.setFlag(true);
        }

        function editData() {
            $scope.dataToEdit = CommonService.getData();
        }

        //edit data - end
        $scope.deleteUser = function (data) {
            $rootScope.userTodelete = data.id;
        }
        //delete user - start
        $scope.delete = function (data) {
            userService.deleteUser(data).then(function (response) {
                if(response.data.success){
                    $timeout(function () {
                        dataGetService.success('User deleted successfully', 1500);
                    },200);
                    $('#myDeleteModal').modal('hide');
                    userlist();
                }
                return response.data;
            })
        };
        //delete user - end
        //update data - start
        $scope.updateEmployees = function (dataToEdit, password) {
            console.log(password);
            if (dataToEdit == undefined || dataToEdit == "undefined" || dataToEdit == "null" || dataToEdit == null) {
                $timeout(function () {
                    dataGetService.errors('Please enter data', 5000);
                },50);
            } else {
                validateDataEntered(dataToEdit, false);
            }
            // $('#editUserModal').on('hidden.bs.modal', function () {
            //     $(this).find("input,textarea,select").val('').end();
            // });
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


