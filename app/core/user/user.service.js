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
        login: {
          method: 'POST',
          params: {
            action: 'login'
          }
        },
        signup: {
          method: 'POST',
          params: {
            action: 'signup'
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
