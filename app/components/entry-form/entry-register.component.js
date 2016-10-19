'use strict';

angular.
  module('entryForm').
  component('entryRegister', {
    controller: [
      function EntryLoginCtrl() {
        this.staticText = {
          formHeader: 'Sign up',
          btnText: 'Sign up',
          redirectLinkText: 'Already have an account? Login'
        };
      }
    ],

    template: `
    <div class="container">
      <div class="row">
        <div class="col-sm-4 col-sm-push-4 text-center">
          <form action="/signup" method="post" class="entry-form">
            <h2>{{$ctrl.staticText.formHeader}}</h2>
            <div class="input-group">
              <input name="email" type="email" class="form-control" placeholder="Email" tabindex="1" aria-describedby="basic-addon2">
              <input name="password"type="password" class="form-control" placeholder="Password" tabindex="2" aria-describedby="basic-addon3">
            </div>
            <button type="submit" class="btn btn-default" tabindex="3">{{$ctrl.staticText.btnText}}</button>
          </form>
          <a href="/login" tabindex="4">{{$ctrl.staticText.redirectLinkText}}</a>
        </div>
      </div>
    </div>
    `,
  });
