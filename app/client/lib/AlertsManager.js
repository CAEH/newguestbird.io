/**
 * @class Alerts Manager
 * @usage AlertManager.showAlert({message: "Shop URL is already exist", type: 'danger'});
 * @usage AlertManager.clearAlert();
 */
AlertsManager = {
  showAlert: function (options) {
    Session.set('AlertsManager.alertData', options);
  },
  
  clearAlert: function () {
    Session.set('AlertsManager.alertData', null);
  }
};
