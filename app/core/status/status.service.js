'use strict';

angular.
  module('core.status').
  factory('IsDBconnected', ['$resource',
    ($resource) => {
      return $resource('http://localhost:3000/isdbconnected', {}, {});
    }
  ]);
