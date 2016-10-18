'use strict';

angular.
  module('notifier').
  component('notifier', {
    controller: ['IsDBconnected',
      function NotifierCtrl(IsDBconnected) {
        // types: success, info, warning, danger
        this.alerts = [];
        this.addAlert = (alert) => {
          this.alerts.push(alert);
        };
        this.removeAlert = (index) => {
          this.alerts.splice(index, 1);
        };

        this.checkDBconnection = () => {
          IsDBconnected.get(res => {
            if (!res.dbconnected) {
              this.addAlert({
                msg: 'Connection to local database failed. Remote one will be used',
                type: 'warning',
                code: 1
              });
            } else {
              let index = this.alerts.indexOf(this.alerts.find(a => a.code === 1));
              if (index !== undefined) this.removeAlert(index);
            }
          });
        };

        this.$onInit = () => {
          this.checkDBconnection();
        };
      }
    ],

    template: `
    <div class="container notifier-container">
      <div class="row">
        <div class="col-sm-6 col-sm-push-3">
          <div ng-repeat="(index, alert) in $ctrl.alerts" class="alert alert-{{alert.type}} notifier-alert text-center" role="alert">
            {{alert.msg}}
            <span class="glyphicon glyphicon-remove" aria-hidden="true" ng-click="$ctrl.removeAlert(index)"></span>
          </div>
        </div>
      </div>
    </div>
    `,
  });
