'use strict';

angular.module('WordClockSection', [])
.controller('wordClockSectionController', function() {})
.directive('wordClockSection', function() {
  return {
    restrict: 'E'
    , require: '^wordClock'
    , templateUrl: "wordClockSection.html"
  }
});
