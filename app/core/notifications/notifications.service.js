'use strict';

angular.
  module('core.notifications').
  factory('Notifications', ['$timeout', '$log',
    function($timeout, $log) {
      // types: success, info, warning, danger
      const timeout = 4000;
      const codes = {
        dbConnectionCode: 1,
        emptyResult: 2,
        remoteSourse: 3,
        unauthorized: 4,
        nopermission: 5
      };

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
        case codes.dbConnectionCode:
          newNotification = {
            msg: 'Connection to local database failed. Remote one will be used',
            type: 'warning',
            code: codes.dbConnectionCode
          };
          break;
        case codes.emptyResult:
          newNotification = {
            msg: 'No movies were found, sorry',
            type: 'danger',
            code: codes.emptyResult
          };
          break;
        case codes.remoteSourse:
          newNotification = {
            msg: 'No results from local database, remote one was used',
            type: 'info',
            code: codes.remoteSourse
          };
          break;
        case codes.unauthorized:
          newNotification = {
            msg: 'Authorization faild. Please, check email & password',
            type: 'danger',
            code: codes.unauthorized
          };
          break;
        case codes.nopermission:
          newNotification = {
            msg: 'Sorry, action is not permited',
            type: 'danger',
            code: codes.nopermission
          };
        }
        if (!newNotification) return;
        this.notifications.push(newNotification);
        this.notificationsLog.push(newNotification);
        $log.debug(`- add notification ${!notification ? '(code ' + code + ')' : ':'}`);
        if (notification) $log.debug(notification);
        $timeout(() => remove(newNotification.code), timeout);
      };

      const remove = (code, index) => {
        if (index != undefined) {
          $log.debug(`- remove notification (index ${index})`);
          this.notifications.splice(index, 1);
          return;
        }
        $log.debug(`- remove notification (code ${code})`);
        this.notifications = this.notifications.filter(n => n.code != code);
      };

      return {
        get,
        getLog,
        add,
        remove,
        codes
      };
    }
  ]);
