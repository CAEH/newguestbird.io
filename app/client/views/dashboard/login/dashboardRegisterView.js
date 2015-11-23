Template.dashboardRegisterView.events({
  'submit .register-form': function (evt) {
    evt.preventDefault();
    LoginManager.register();
  }
});
