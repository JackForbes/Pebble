'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('PageCtrl', ['$scope', '$location', '$http', 'SiteModel', function($scope, $location, $http, SiteModel) {

    $scope.initialize = function() {
      $scope.focused = true;
      var searchObject = $location.search();
      if (searchObject.subreddit && searchObject.type) {
        $scope.elements = [];
        $scope.loadSubreddit(searchObject.subreddit, searchObject.type);
      } else {
        $scope.selectedIndex = -1;
        $scope.subreddits = [];
        var url='https://www.reddit.com/reddits.json?limit=100&&jsonp=JSON_CALLBACK';
        $http.jsonp(url).success(function(data) {
          var dataset = data.data.children;
          for (var i = 0; i < dataset.length; ++i) {
            $scope.subreddits.push(dataset[i].data.display_name);
          }
        });
      }
    };

    $scope.loadSubreddit = function(subreddit, type) {
      var url='https://api.reddit.com/r/' + subreddit + '/' + type + '?jsonp=JSON_CALLBACK';
      $http.jsonp(url).success(function(data) {
        var dataset = data.data.children;
        for (var i = 0; i < dataset.length; ++i) {
          $scope.elements.push(dataset[i].data);
        }
      });
      $scope.searchParam = subreddit;
      $scope.type = type;
      $scope.focused = false;
    }

    $scope.submitSubreddit = function(suggestion) {
      if (suggestion) {
        $scope.searchParam = suggestion;
      }
      var url = 'index.html#/search?subreddit=' + $scope.searchParam;
      var topUrl = url + '&type=top';
      var newUrl = url + '&type=new';
      var topWin = window.open(topUrl, '_blank');
      topWin.focus();
      var newWin = window.open(newUrl, '_blank');
      newWin.focus();
    };

    $scope.blur = function(e) {
      setTimeout(function() {
        $scope.selectedIndex = -1;
        $scope.focused = false;
      }, 200);
    };

    $scope.getHours = function(unix_timestamp) {
      var date = new Date(unix_timestamp*1000);
      var hours = date.getHours();
      return hours;
    }

  }]);
