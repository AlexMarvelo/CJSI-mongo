'use strict';

angular.
  module('entryForm').
  component('entryLogin', {
    controller: ['User', 'Authorization',
      function EntryLoginCtrl(User, Authorization) {
        this.static = {
          formHeader: 'Login',
          btnText: 'Login',
          signupLink: {
            text: 'Don\'t have an account? Sign up',
            state: 'signup'
          }
        };

        this.login = (event) => {
          event.preventDefault();
          User.login({ email: 'admin@admin.com', password: 'admin' }, (user) => {
            let isLogined = user.local != undefined;
            if (isLogined) Authorization.go('home');
          });
        };
      }
    ],

    template: `
    <div class="container">
      <div class="row">
        <div class="col-sm-4 col-sm-push-4 text-center">
          <form action="/user/login" method="post" class="entry-form" autocomplete="on" ng-submit="$ctrl.login($event)">
            <h2>{{$ctrl.static.formHeader}}</h2>
            <div class="input-group">
              <input name="email" type="text" class="form-control" placeholder="Email" tabindex="1" aria-describedby="basic-addon1">
              <input name="password" type="password" class="form-control" placeholder="Password" tabindex="2" aria-describedby="basic-addon2">
            </div>
            <button type="submit" class="btn btn-default" tabindex="3">{{$ctrl.static.btnText}}</button>
          </form>
          <a ui-sref="{{$ctrl.static.signupLink.state}}" tabindex="4">{{$ctrl.static.signupLink.text}}</a>
        </div>
      </div>
    </div>
    `,
  });
