'use strict';

angular.
  module('core.user').
  factory('User', [
    '$state', '$log', '$resource', 'localStorageService', 'CONFIG',
    function($state, $log, $resource, localStorageService, CONFIG) {
      const serverRequest = $resource(`${CONFIG.appDomain}/user/:action`, {action: 'get'}, {
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

      const authorized = () => this.user != undefined;

      const init = () => {
        this.user = localStorageService.get('user') || false;
        update();
      };

      const update = () => {
        serverRequest.get(user => {
          if (user.local == undefined) {
            this.user = false;
            return;
          }
          this.user = user;
          $log.debug(`- Authorization init. User: ${this.user.local.email}`);
          localStorageService.set('user', this.user);
        });
      };

      const set = (user) => {
        this.user = user;
        localStorageService.set('user', this.user);
      };

      const get = () => this.user;

      const clear = () => {
        this.user = undefined;
        localStorageService.set('user', this.user);
      };

      const getFavourites = () => this.user.favourites || [];
      const addFavourite = (movieID) => this.user.favourites.push(movieID);
      const removeFavourite = (movieID) => this.user.favourites = this.user.favourites.filter(id => id != movieID);

      return {
        init,
        authorized,
        clear,
        get,
        set,
        getFavourites,
        addFavourite,
        removeFavourite,
        serverRequest
      };
    }
  ]);
