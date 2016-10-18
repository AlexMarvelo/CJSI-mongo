'use strict';

angular.
  module('notifier').
  component('notifier', {
    controller: ['IsDBconnected',
      function NotifierCtrl(IsDBconnected) {
        // types: success, info, warning, danger
        // codes: 1 - db connection failed
        //        2 - empty search result response
        const dbConnectionCode = 1;
        const emptyResult = 2;
        this.alerts = [];
        this.addAlert = (code, alert) => {
          if (alert) {
            this.alerts.push(alert);
            return;
          }
          switch (code) {
          case dbConnectionCode:
            this.alerts.push({
              msg: 'Connection to local database failed. Remote one will be used',
              type: 'warning',
              code: dbConnectionCode
            });
            break;
          case emptyResult:
            this.alerts.push({
              msg: 'Movies not found, sorry',
              type: 'danger',
              code: emptyResult
            });
            break;
          }
        };
        this.removeAlert = (code, index) => {
          if (index !== undefined) {
            this.alerts.splice(index, 1);
            return;
          }
          this.alerts.filter(a => a.code === dbConnectionCode)
            .forEach((a, i) => this.removeAlert(dbConnectionCode, i));
        };

        this.checkDBconnection = () => {
          IsDBconnected.get(res => {
            if (!res.dbconnected) {
              this.addAlert(1);
            } else {
              this.removeAlert(1);
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
