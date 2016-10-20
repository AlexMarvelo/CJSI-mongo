'use strict';

angular.
  module('notifier').
  component('notifier', {
    controller: ['$scope', 'Status', 'Notifications',
      function NotifierCtrl($scope, Status, Notifications) {
        this.notifications = [];

        this.$onInit = () => {
          this.checkDBconnection();
        };

        $scope.$watch(
          Notifications.get,
          (notifications) => {
            this.notifications = notifications;
          }
        );

        this.removeNotification = (code) => {
          Notifications.remove(code);
        };

        this.checkDBconnection = () => {
          Status.dbconnection(res => {
            if (!res.dbconnected) {
              Notifications.add(1);
            } else {
              Notifications.remove(1);
            }
          });
        };
      }
    ],

    template: `
      <div class="notifier-container">
        <div class="container">
          <div class="row">
            <div class="col-sm-6 col-sm-push-3">
              <div ng-repeat="notification in $ctrl.notifications" class="alert alert-{{notification.type}} notifier-alert text-center" role="alert">
                {{notification.msg}}
                <span class="glyphicon glyphicon-remove" aria-hidden="true" ng-click="$ctrl.removeNotification(notification.code)"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  });
