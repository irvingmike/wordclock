"use strict";

/**
 * Created by ara024 on 4/14/17.
 */

let app = angular.module('WordClock', []);

app.controller('WordClockController', function($scope) {

  $scope.test = "BACON!";

  $scope.settings = {
    width: 11
    , height: 11
    ,updatePeriod: 1 //In minutes
  };

  $scope.text = {
    '0': {
      '0': "i", '1': "t’", '2': "s", '3': "z", '4': "a", '5': "t", '6': "h", '7': "a", '8': "l", '9': "f", 'a': "b"
    },
    '1': {
      '0': "n", '1': "t", '2': "e", '3': "n", '4': "q", '5': "u", '6': "a", '7': "r", '8': "t", '9': "e", 'a': "r"
    },
    '2': {
      '0': "t", '1': "w", '2': "e", '3': "n", '4': "t", '5': "y", '6': "p", '7': "f", '8': "i", '9': "v", 'a': "e"
    },
    '3': {
      '0': "w", '1': "a", '2': "y", '3': "t", '4': "i", '5': "l", '6': "p", '7': "a", '8': "s", '9': "t", 'a': "z"
    },
    '4': {
      '0': "o", '1': "s", '2': "e", '3': "v", '4': "e", '5': "n", '6': "y", '7': "n", '8': "o", '9': "o", 'n': "b"
    },
    '5': {
      '0': "k", '1': "b", '2': "i", '3': "r", '4': "t", '5': "h", '6': "w", '7': "d", '8': "a", '9': "y", 'a': "t"
    },
    '6': {
      '0': "m", '1': "i", '2': "d", '3': "n", '4': "i", '5': "g", '6': "h", '7': "t", '8': "t", '9': "e", 'a': "n"
    },
    '7': {
      '0': "f", '1': "i", '2': "v", '3': "e", '4': "n", '5': "i", '6': "n", '7': "e", '8': "t", '9': "e", 'a': "n"
    },
    '8': {
      '0': "e", '1': "l", '2': "e", '3': "v", '4': "e", '5': "n", '6': "e", '7': "i", '8': "g", '9': "h", 'a': "t"
    },
    '9': {
      '0': "o", '1': "n", '2': "e", '3': "s", '4': "i", '5': "x", '6': "t", '7': "h", '8': "r", '9': "e", 'a': "e"
    },
    'a': {
      '0': "f", '1': "o", '2': "u", '3': "r", '4': "z", '5': "o’", '6': "c", '7': "l", '8': "o", '9': "c", 'k': "b"
    }
  };

});

app.directive('wordClock', function() {
  return {
    restrict: 'E'
    , templateUrl: "app/wordClock.html"
  }
});

app.directive('wordClockSection', function() {
  return {
    restrict: 'E'
    , templateUrl: "app/wordClockSection.html"
  }
});