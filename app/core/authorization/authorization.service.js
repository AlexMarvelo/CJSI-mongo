'use strict';

angular.
  module('core.authorization').
  factory('Authorization', [
    '$state', 'User', 'localStorageService',
    function($state, User, localStorageService) {
      this.authorized  = localStorageService.get('lastAuth') || false;

      const init = () => {
        update();
      };

      const update = () => {
        User.get(user => {
          if (user.local != undefined) this.authorized = true;
          console.log(`authorization init with ${this.authorized}`);
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
