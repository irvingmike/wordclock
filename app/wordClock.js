"use strict";

/**
 * Created by ara024 on 4/14/17.
 */

let app = angular.module('WordClock', []);

const debugActive = false;

app.controller('WordClockController', function($scope, $interval, $timeout) {

  $scope.clock = {
    text: {
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
        '0': "o", '1': "s", '2': "e", '3': "v", '4': "e", '5': "n", '6': "y", '7': "n", '8': "o", '9': "o", 'a': "n"
      },
      '5': {
        '0': "k", '1': "b", '2': "i", '3': "r", '4': "t", '5': "h", '6': "w", '7': "d", '8': "a", '9': "y", 'a': "t"
      },
      '6': {
        '0': "m", '1': "i", '2': "d", '3': "n", '4': "i", '5': "g", '6': "h", '7': "t", '8': "t", '9': "e", 'a': "n"
      },
      '7': {
        '0': "f", '1': "i", '2': "v", '3': "e", '4': "n", '5': "i", '6': "n", '7': "e", '8': "t", '9': "w", 'a': "o"
      },
      '8': {
        '0': "e", '1': "l", '2': "e", '3': "v", '4': "e", '5': "n", '6': "e", '7': "i", '8': "g", '9': "h", 'a': "t"
      },
      '9': {
        '0': "o", '1': "n", '2': "e", '3': "s", '4': "i", '5': "x", '6': "t", '7': "h", '8': "r", '9': "e", 'a': "e"
      },
      'a': {
        '0': "f", '1': "o", '2': "u", '3': "r", '4': "z", '5': "o’", '6': "c", '7': "l", '8': "o", '9': "c", 'a': "k"
      }
    }
    , settings: {
      width: 11
      , height: 11
      , updatePeriod: 10 //In seconds
    }
    , wordMap: {
      'its': ['00', '01', '02']
      , 'a': ['04']
      , 'halfPos': ['06', '07', '08', '09']
      , 'tenPos': ['11', '12', '13']
      , 'quarterPos': ['14', '15', '16', '17', '18', '19', '1a']
      , 'twentyPos': ['20', '21', '22', '23', '24', '25']
      , 'fivePos': ['27', '28', '29', '2a']
      , 'way': ['30', '31', '32']
      , 'til': ['33', '34', '35']
      , 'past': ['36', '37', '38', '39']
      , 'seven': ['41', '42', '43', '44', '45']
      , 'noon': ['47', '48', '49', '4a']
      , 'midnight': ['60', '61', '62', '63', '64', '65', '66', '67']
      , 'ten': ['68', '69', '6a']
      , 'five': ['70', '71', '72', '73']
      , 'nine': ['74', '75', '76', '77']
      , 'two': ['78', '79', '7a']
      , 'eleven': ['80', '81', '82', '83', '84', '85']
      , 'eight': ['86', '87', '88', '89', '8a']
      , 'one': ['90', '91', '92']
      , 'six': ['93', '94', '95']
      , 'three': ['96', '97', '98', '99', '9a']
      , 'four': ['a0', 'a1', 'a2', 'a3']
      , 'oclock': ['a5', 'a6', 'a7', 'a8', 'a9', 'aa']
      , 'happy': ['06', '16', '26', '36', '46']
      , 'birthday': ['51', '52', '53', '54', '55', '56', '57', '58', '59']
    }
    , currentDisplay: ['00', '0a', 'a0', 'aa']
    , currentTime:  {'hours': 0, 'minutes': 0}
  };

  // Watches the current time and checks to see if the clock needs to be update when it changes
  $scope.$watch('clock.currentTime', function (newVal, oldVal) { checkTime($scope); }, true);

  // Watches the current display array and updates the page when it changes
  $scope.$watch('clock.currentDisplay', function (newVal, oldVal) { highlightWords($scope); }, true);

  // Checking the time at set interval
  function updateClock() {

    debug('*** Updating clock ***');
    let now = new Date(Date.now());
    $scope.clock.currentTime = {'hours': now.getHours(), 'minutes': now.getMinutes() };
    debug($scope.clock.currentTime);
  }

  updateClock();
  $interval(updateClock, $scope.clock.settings.updatePeriod * 1000);

  $timeout(function() {
    highlightWords($scope);
  }, 100);

})
.directive('wordClock', function() {
  return {
    restrict: 'E'
    , template: "<div class='wordClockRow' ng-repeat='(rowkey, rowItems) in clock.text'> <word-clock-section ng-repeat='(itemkey, item) in rowItems'></word-clock-section></div>"
  }
})
.directive('wordClockSection', function() {
  return {
    restrict: 'E'
    , template: "<div class='wordClockSection' id='{{ rowkey }}{{ itemkey }}'>{{ item }}</div>"
  }
});

function checkTime($scope) {
  debug('*** Checking Time ***');
  let newDisplay = [];
  let hours = $scope.clock.currentTime.hours;
  let minutes = $scope.clock.currentTime.minutes;

  newDisplay.push.apply(newDisplay, $scope.clock.wordMap.its);

  switch (true) { // Switch on minutes
    case (minutes < 3): break;
    case (minutes < 8):
      newDisplay.push.apply(newDisplay, $scope.clock.wordMap.fivePos);
      newDisplay.push.apply(newDisplay, $scope.clock.wordMap.past);
      break;
    case (minutes < 13):
      newDisplay.push.apply(newDisplay, $scope.clock.wordMap.tenPos);
      newDisplay.push.apply(newDisplay, $scope.clock.wordMap.past);
      break;
    case (minutes < 18):
      newDisplay.push.apply(newDisplay, $scope.clock.wordMap.quarterPos);
      newDisplay.push.apply(newDisplay, $scope.clock.wordMap.past);
      break;
    case (minutes < 23):
      newDisplay.push.apply(newDisplay, $scope.clock.wordMap.twentyPos);
      newDisplay.push.apply(newDisplay, $scope.clock.wordMap.past);
      break;
    case (minutes < 28):
      newDisplay.push.apply(newDisplay, $scope.clock.wordMap.twentyPos);
      newDisplay.push.apply(newDisplay, $scope.clock.wordMap.fivePos);
      newDisplay.push.apply(newDisplay, $scope.clock.wordMap.past);
      break;
    case (minutes < 33):
      newDisplay.push.apply(newDisplay, $scope.clock.wordMap.halfPos);
      newDisplay.push.apply(newDisplay, $scope.clock.wordMap.past);
      break;
    case (minutes < 38):
      newDisplay.push.apply(newDisplay, $scope.clock.wordMap.twentyPos);
      newDisplay.push.apply(newDisplay, $scope.clock.wordMap.fivePos);
      newDisplay.push.apply(newDisplay, $scope.clock.wordMap.til);
      hours++;
      break;
    case (minutes < 43):
      newDisplay.push.apply(newDisplay, $scope.clock.wordMap.twentyPos);
      newDisplay.push.apply(newDisplay, $scope.clock.wordMap.til);
      hours++;
      break;
    case (minutes < 48):
      newDisplay.push.apply(newDisplay, $scope.clock.wordMap.quarterPos);
      newDisplay.push.apply(newDisplay, $scope.clock.wordMap.til);
      hours++;
      break;
    case (minutes < 53):
      newDisplay.push.apply(newDisplay, $scope.clock.wordMap.tenPos);
      newDisplay.push.apply(newDisplay, $scope.clock.wordMap.til);
      hours++;
      break;
    case (minutes < 58):
      newDisplay.push.apply(newDisplay, $scope.clock.wordMap.fivePos);
      newDisplay.push.apply(newDisplay, $scope.clock.wordMap.til);
      hours++;
      break;
    case (minutes >= 58):
      hours++;
      break;
    default: break;
  }

  debug("Hours: " + hours);
  switch(hours) {
    case 1:
    case 13: newDisplay.push.apply(newDisplay, $scope.clock.wordMap.one); break;
    case 2:
    case 14: newDisplay.push.apply(newDisplay, $scope.clock.wordMap.two); break;
    case 3:
    case 15: newDisplay.push.apply(newDisplay, $scope.clock.wordMap.three); break;
    case 4:
    case 16: newDisplay.push.apply(newDisplay, $scope.clock.wordMap.four); break;
    case 5:
    case 17: newDisplay.push.apply(newDisplay, $scope.clock.wordMap.five); break;
    case 6:
    case 18: newDisplay.push.apply(newDisplay, $scope.clock.wordMap.six); break;
    case 7:
    case 19: newDisplay.push.apply(newDisplay, $scope.clock.wordMap.seven); break;
    case 8:
    case 20: newDisplay.push.apply(newDisplay, $scope.clock.wordMap.eight); break;
    case 9:
    case 21: newDisplay.push.apply(newDisplay, $scope.clock.wordMap.nine); break;
    case 10:
    case 22: newDisplay.push.apply(newDisplay, $scope.clock.wordMap.ten); break;
    case 11:
    case 23: newDisplay.push.apply(newDisplay, $scope.clock.wordMap.eleven); break;
    case 12: newDisplay.push.apply(newDisplay, $scope.clock.wordMap.noon); break;
    default: newDisplay.push.apply(newDisplay, $scope.clock.wordMap.midnight); break;
  }

  $scope.clock.currentDisplay = newDisplay;

}

function highlightWords($scope) {
  debug("*** Highlighting new words ***");
  clearActiveClass($scope);
  for (let id of $scope.clock.currentDisplay) {
    try {
      let elementClassList = document.getElementById(id).classList.add('active');
    } catch(err) { debug(err); }
  }
  debug($scope.clock.currentDisplay);
}

function clearActiveClass($scope) {
  for (let y = 0; y < $scope.clock.settings.height; y++) {
    for (let x = 0; x < $scope.clock.settings.width; x++) {

      let id = (y === 10) ? 'a' : y.toString();
      id += (x === 10) ? 'a' : x.toString();
      try {
        document.getElementById(id).classList.remove('active');
      } catch(err) {
        // debug(err);
      }
    }
  }
}

function debug(error) {
  if (debugActive) {
    console.log(error);
  }
}