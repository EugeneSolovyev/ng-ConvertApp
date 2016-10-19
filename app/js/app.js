var app = angular.module('current-App', []);
app.directive('currentBody', function() {
  return {
    restrict: 'E',
    controller: 'TodayCourse',
    controllerAs: 'tCourse',
    templateUrl: 'current-body.html'
  }
});

app.controller('TodayCourse', function (todayCourse) {
  var self = this;
  self.selectedCurrency = 0;
  self.result = 0;
  self.euro = 0;
  this.getEuro = function (euro, selected) {
    return euro * selected;
  };
  this.current = todayCourse.getCurrency();


  self.update = updateResult;
  function updateResult() {
    if (angular.isNumber(Number(self.euro))) {
      self.result = this.getEuro(self.euro, self.selectedCurrency);
    }
  };
});

app.service('todayCourse', function ($http) {
  this.course = [];

  $http.get('http://api.fixer.io/latest').then(resolved => {
    for (var key in resolved.data.rates) {
      this.course.push({
        'name': key,
        'course': resolved.data.rates[key]
      });
    }
  });
  this.getCurrency = function () {
    return this.course;
  };
});