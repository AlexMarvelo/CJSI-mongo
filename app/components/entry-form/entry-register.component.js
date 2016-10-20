'use strict';

angular.
  module('entryForm').
  component('entryRegister', {
    controller: [
      '$log', '$scope', 'User', 'Authorization', 'CONFIG',
      function EntryLoginCtrl($log, $scope, User, Authorization, CONFIG) {
        this.static = {
          formHeader: 'Sign up',
          btnText: 'Sign up',
          loginLink: {
            text: 'Already have an account? Login',
            state: 'login'
          }
        };

        this.signup = (event) => {
          event.preventDefault();
          User.signup({
            email: $scope.email,
            password: $scope.password
          }, (user) => {
            let isLogined = user.local != undefined;
            if (!isLogined) return;
            if (CONFIG.debug) $log.log('- signed up & logged in');
            Authorization.setUser(user);
            Authorization.go('home');
          });
        };
      }
    ],

    template: `
    <div class="container">
      <div class="row">
        <div class="col-sm-4 col-sm-push-4 text-center">
          <form action="/user/signup" method="post" class="entry-form" ng-submit="$ctrl.signup($event)">
            <h2>{{$ctrl.static.formHeader}}</h2>
            <div class="input-group">
              <input name="email" ng-model="email" type="email" class="form-control" placeholder="Email" tabindex="1">
              <input name="password"type="password" ng-model="password" class="form-control" placeholder="Password" tabindex="2">
            </div>
            <button type="submit" class="btn btn-default" tabindex="3">{{$ctrl.static.btnText}}</button>
          </form>
          <a href="{{$ctrl.static.loginLink.state}}" tabindex="4">{{$ctrl.static.loginLink.text}}</a>
        </div>
      </div>
    </div>
    `,
  });
