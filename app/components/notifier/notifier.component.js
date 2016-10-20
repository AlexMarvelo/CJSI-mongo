'use strict';

angular.
  module('notifier').
  component('notifier', {
    controller: ['$scope', 'Notifications',
      function NotifierCtrl($scope, Notifications) {
        this.notifications = [];

        $scope.$watch(
          Notifications.get,
          (notifications) => {
            this.notifications = notifications;
          }
        );

        this.removeNotification = (code, index) => {
          Notifications.remove(code, index);
        };
      }
    ],

    template: `
      <div class="notifier-container">
        <div class="container">
          <div class="row">
            <div class="col-sm-6 col-sm-push-3">
              <div ng-repeat="(index, notification) in $ctrl.notifications" class="alert alert-{{notification.type}} notifier-alert text-center" role="alert">
                {{notification.msg}}
                <span class="glyphicon glyphicon-remove" aria-hidden="true" ng-click="$ctrl.removeNotification(notification.code, index)"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  });
