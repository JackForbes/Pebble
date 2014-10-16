'use strict';

/* Services */
angular.module('myApp.services', []).
  service('SiteModel', [function() {
    return {
      samplePost: {
        author: 'Anonymous',
        created_utc: 1413394705,
        num_comments: 10,
        score: 1000,
        title: 'Sample Reddit Post'
      }
    };
  }]);
