'use strict';

angular.
  module('core.notifications').
  factory('Notifications', ['$timeout', '$log',
    function($timeout, $log) {
      // types: success, info, warning, danger
      // codes: 1 - db connection failed
      //        2 - empty search result response
      const dbConnectionCode = 1;
      const emptyResult = 2;
      const remoteSourse = 3;
      const timeout = 3000;

      this.notifications = [];
      this.notificationsLog = [];

      const get = () => this.notifications;
      const getLog = () => this.notificationsLog;

      const add = (code, notification) => {
        if (notification) {
          this.notifications.push(notification);
          return;
        }
        let newNotification;
        switch (code) {
        case dbConnectionCode:
          newNotification = {
            msg: 'Connection to local database failed. Remote one will be used',
            type: 'warning',
            code: dbConnectionCode
          };
          break;
        case emptyResult:
          newNotification = {
            msg: 'No movies were found, sorry',
            type: 'danger',
            code: emptyResult
          };
          break;
        case remoteSourse:
          newNotification = {
            msg: 'No results from local database, remote one was used',
            type: 'info',
            code: remoteSourse
          };
          break;
        }
        if (newNotification) {
          this.notifications.push(newNotification);
          this.notificationsLog.push(newNotification);
          $log.debug(`- add notification ${!notification ? '(code ' + code + ')' : ':'}`);
          if (notification) $log.debug(notification);
          $timeout(() => remove(newNotification.code), timeout);
        }
      };

      const remove = (code) => {
        $log.debug(`- remove notification (code ${code})`);
        this.notifications = this.notifications.filter(n => n.code != code);
      };

      return {
        get,
        getLog,
        add,
        remove
      };
    }
  ]);
