Template.dashboardLoginView.events({
  'submit .login-form': function (evt) {
    evt.preventDefault();
    LoginManager.login();
  }
});
