'use strict';

angular.
  module('core.movies').
  factory('Movie', ['$resource', 'CONFIG',
    ($resource, CONFIG) => {
      return $resource(`${CONFIG.appDomain}/movie/:movieID/:action`, {movieID: 0, action: 'get'}, {
        get: {
          method: 'GET',
          params: {
            action: 'get'
          }
        }
      });
    }
  ]);
