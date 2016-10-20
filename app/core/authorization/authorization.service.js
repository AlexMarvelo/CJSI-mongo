'use strict';

angular.
  module('core.authorization').
  factory('Authorization', [
    '$state', '$log', 'User', 'localStorageService', 'CONFIG',
    function($state, $log, User, localStorageService, CONFIG) {
      this.authorized  = localStorageService.get('lastAuth') || false;

      const init = () => {
        update();
      };

      const update = () => {
        User.get(user => {
          if (user.local != undefined) this.authorized = true;
          if (CONFIG.debug) $log.log(`- Authorization init with ${this.authorized}`);
          localStorageService.set('lastAuth', this.authorized);
        });
      };

      const getAuthorized = () => this.authorized;

      const clear = () => {
        this.authorized = false;
        localStorageService.set('lastAuth', this.authorized);
      };

      const go = (targetState = 'home') => {
        this.authorized = true;
        $state.go(targetState);
        localStorageService.set('lastAuth', this.authorized);
      };

      return {
        init: init,
        authorized: getAuthorized,
        clear: clear,
        go: go
      };
    }
  ]);
