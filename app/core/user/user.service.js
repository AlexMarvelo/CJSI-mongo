'use strict';

angular.
  module('core.user').
  factory('User', ['$resource', 'CONFIG',
    ($resource, CONFIG) => {
      return $resource(`${CONFIG.appDomain}/user/:action`, {action: 'get'}, {
        get: {
          method: 'GET',
          params: {
            action: 'get'
          }
        },
        logout: {
          method: 'GET',
          params: {
            action: 'logout'
          }
        }
      });
    }
  ]);
