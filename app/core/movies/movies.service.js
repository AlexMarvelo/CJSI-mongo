'use strict';

angular.
  module('core.movies').
  factory('Movies', ['$resource', 'CONFIG',
    ($resource, CONFIG) => {
      return $resource(`${CONFIG.appDomain}/search/`, {}, {
        query: {
          method: 'GET'
        }
      });
    }
  ]);
