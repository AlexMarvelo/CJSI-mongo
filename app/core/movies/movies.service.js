'use strict';

angular.
  module('core.movies').
  factory('Movies', ['$resource',
    ($resource) => {
      return $resource('http://localhost:3000', {}, {
        query: {
          method: 'GET',
          params: {
            s: ''
          }
        }
      });
    }
  ]).
  
  factory('Movie', ['$resource',
    ($resource) => {
      return $resource('http://localhost:3000/movie/', {}, {
        query: {
          method: 'GET',
          params: {
            i: ''
          }
        }
      });
    }
  ]);
