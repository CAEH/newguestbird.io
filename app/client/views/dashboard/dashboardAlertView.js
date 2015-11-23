Template.dashboardAlertView.helpers({
  alert: function () {
    return Session.get('AlertsManager.alertData');
  }
});
