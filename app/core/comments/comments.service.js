'use strict';

angular.
  module('core.comments').
  factory('Comments', ['$resource', 'CONFIG',
    ($resource, CONFIG) => {
      const serverRequest = $resource(`${CONFIG.appDomain}/comments/:movieID/:action`, {movieID: 0, action: 'get'}, {
        get: {
          method: 'GET',
          params: {
            action: 'get'
          }
        },
        add: {
          method: 'GET',
          params: {
            action: 'add'
          }
        },
        remove: {
          method: 'GET',
          params: {
            action: 'remove'
          }
        }
      });

      return {
        serverRequest
      };
    }
  ]);
