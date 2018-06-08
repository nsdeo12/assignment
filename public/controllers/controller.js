var app = angular.module('assignApp', []);
app.controller('appCtrl', ['$scope', '$http',

    function ($scope, $http, $rootScope) {
        $scope.test = "from Controller"
        console.log("testing controler");


        


        $scope.multiplyNumbers = function (firstNumber, secondNumber) {
            alert(firstNumber * secondNumber)
            result = firstNumber * secondNumber;
            $scope.result = result;





            //check numbers sanity
            $scope.checkNumber=function(){

                if (firstNumber>0){
                    return true;
                    
                }
            }
            


            var jsonObj = {

                "first_number": firstNumber,
                "second_number": secondNumber,
                "result": result
            }
            $scope.saveData=function(){
                console.log("json object",jsonObj);
                $http.post('/saveData',jsonObj)
                .then(function (serverRes) {
                                      
                    console.log("posted data",serverRes);                    

                })
            }
            $scope.saveData();
            return result;

        }



        // $http.get('/getData', function () {
        $http.get('/getData')
            .then(function (response) { //.success not working
                console.log("response::", response);
                $scope.datas = response.data;



            })
            .catch(function (error) {
                console.log("error");
            })









        //dummy data to test the UI behaviour
        // first_multiplication = {
        //     first_number: 22,
        //     second_number: 33,
        //     result: 726

        // };
        // second_multiplication = {
        //     first_number: 21,
        //     second_number: 7,
        //     result: 147
        // };
        // var datas = [first_multiplication, second_multiplication];          
        //$scope.datas = datas;
        //  })
    }

]);
app.directive('multiplyTwoNumbers', function () {
    console.log("inside directive");


    return {
        restrict: 'E',
        scope: {
            result: '=data',
            multiply: '&'

        },
        template: '<button id="btn1" class="btn btn-success" ng-click="multiply()" ng-disabled="check()"> <h3>Multiply</h3> ',
        controller: function ($scope) {
            console.log("from Dirctive", $scope.result)
            $scope.check=function(){

                return false
            }
            $scope.check();

        }
    };

})

