'use strict';

angular.
  module('notifier').
  component('notifier', {
    controller: [
      function NotifierCtrl() {
        // types: success, info, warning, danger
        // {
        //   msg: 'Danger!',
        //   type: 'danger'
        // }
        this.alerts = [];

        this.addAlert = (alert) => {
          this.alerts.push(alert);
        };
        this.removeAlert = (index) => {
          this.alerts.splice(index, 1);
        };
      }
    ],

    template: `
    <div class="container notifier-container">
      <div class="row">
        <div class="col-sm-4 col-sm-push-4">
          <div ng-repeat="(index, alert) in $ctrl.alerts" class="alert alert-{{alert.type}} notifier-alert" role="alert">
            {{alert.msg}}
            <span class="glyphicon glyphicon-remove" aria-hidden="true" ng-click="$ctrl.removeAlert(index)"></span>
          </div>
        </div>
      </div>
    </div>
    `,
  });
