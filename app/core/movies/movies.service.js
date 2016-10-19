'use strict';

angular.
  module('core.movies').
  factory('Movies', ['$resource', 'CONFIG',
    ($resource, CONFIG) => {
      return $resource(CONFIG.appDomain, {}, {
        query: {
          method: 'GET'
        }
      });
    }
  ]).

  factory('Movie', ['$resource', 'CONFIG',
    ($resource, CONFIG) => {
      return $resource(`${CONFIG.appDomain}/movie/`, {}, {
        query: {
          method: 'GET'
        }
      });
    }
  ]);
