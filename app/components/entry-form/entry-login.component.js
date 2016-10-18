'use strict';

angular.
  module('entryForm').
  component('entryLogin', {
    controller: [
      function EntryLoginCtrl() {
        this.staticText = {
          formHeader: 'Login',
          btnText: 'Login',
          redirectLinkText: 'Don\'t have an account? Sign up'
        };
      }
    ],

    template: `
    <div class="container">
      <div class="row">
        <div class="col-sm-4 col-sm-push-4 text-center">
          <form action="/login" class="entry-form" autocomplete="on">
            <h2>{{$ctrl.staticText.formHeader}}</h2>
            <div class="input-group">
              <input name="username" type="text" class="form-control" placeholder="Username" tabindex="1" aria-describedby="basic-addon1">
              <input name="password" type="password" class="form-control" placeholder="Password" tabindex="2" aria-describedby="basic-addon2">
            </div>
            <button type="submit" class="btn btn-default" tabindex="3">{{$ctrl.staticText.btnText}}</button>
          </form>
          <a href="/signup" tabindex="4">{{$ctrl.staticText.redirectLinkText}}</a>
        </div>
      </div>
    </div>
    `,
  });
