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
          <form action="" class="entry-form">
            <h2>{{$ctrl.staticText.formHeader}}</h2>
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Username" tabindex="1" aria-describedby="basic-addon1">
              <input type="email" class="form-control" placeholder="Email" tabindex="2" aria-describedby="basic-addon2">
              <input type="password" class="form-control" placeholder="Password" tabindex="3" aria-describedby="basic-addon3">
            </div>
            <button type="submit" class="btn btn-default" tabindex="4">{{$ctrl.staticText.btnText}}</button>
          </form>
          <a href="/login" tabindex="5">{{$ctrl.staticText.redirectLinkText}}</a>
        </div>
      </div>
    </div>
    `,
  });
