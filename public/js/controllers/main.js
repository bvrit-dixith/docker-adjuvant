  angular.module('orderController', ["chart.js"])
      .controller('orderController', ['$scope', '$http', '$interval' , 'googleService',
                                       'mongooseService', 'statsService', 'Flash',
            function($scope, $http, $interval, googleService,
                        mongooseService, statsService, Flash) {

          $http({method: 'GET', url: '/data.json'}).
              success(function(data) {
                  $scope.colours = data.juices;
          });

          $scope.employeeId = "16305";
          $scope.name = "Dixith";
          $scope.successMessage = false;
          $scope.placedOrder = false;

          var dayInMilliseconds = 86400000;


          $interval(function() {
                googleService.getStats()
                             .then(_updateMongo)
                             .then(_cleanSpreadSheet)
           }, dayInMilliseconds);

          $scope.placeOrder = function() {
              $scope.placedOrder = true;
              googleService.create(_constructOrder())
                      .then(_notifySuccess);
          };

          var _constructOrder = function() {
             var date = _getTodayDate();
             return {
                  'Name' : $scope.name,
                  'EmployeeId': $scope.employeeId,
                  'Order': $scope.selected,
                  'Date': date
             }
          }

          var _notifySuccess = function(response) {
             var message = '<strong>Thank you!</strong> We successfully placed your Order';
             Flash.create('success', message, 'col-sm-4 col-sm-offset-4');
             $scope.successMessage = true;
             $scope.placedOrder = false;
          }

          var _getTodayDate = function() {
             var today = new Date();
             return today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear();
          }

          var _updateMongoAndCleanSpreadSheet = function(response) {
                  mongooseService
                          .update(statsService.getDetails(response.data).shift())
          }

          var _cleanSpreadSheet = function() {
            googleService.deleteContents();
          }
  }]);