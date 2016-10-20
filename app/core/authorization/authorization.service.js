'use strict';

angular.
  module('core.authorization').
  factory('Authorization', [
    '$state', '$log', 'User', 'localStorageService', 'CONFIG',
    function($state, $log, User, localStorageService, CONFIG) {
      const getAuthorized = () => this.authorized;

      const init = () => {
        this.authorized  = localStorageService.get('lastAuth') || false;
        this.user  = localStorageService.get('user') || false;
        update();
      };

      const setUser = (user) => {
        this.user = user;
        localStorageService.set('user', this.user);
      };
      const getUser = () => this.user;

      const update = () => {
        User.get(user => {
          if (user.local == undefined) return;
          this.authorized = true;
          this.user = user;
          if (CONFIG.debug) $log.log(`- Authorization init with ${this.authorized}`);
          localStorageService.set('lastAuth', this.authorized);
          localStorageService.set('user', this.user);
        });
      };

      const clear = () => {
        this.authorized = false;
        this.user = false;
        localStorageService.set('lastAuth', this.authorized);
        localStorageService.set('user', this.user);
      };

      const go = (targetState = 'home') => {
        this.authorized = true;
        $state.go(targetState);
        localStorageService.set('lastAuth', this.authorized);
      };

      return {
        init,
        authorized: getAuthorized,
        clear,
        go,
        setUser,
        getUser
      };
    }
  ]);
