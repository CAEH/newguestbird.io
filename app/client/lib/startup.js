Meteor.startup(function () {
  Session.set('termsAccepted', localStorage.getItem('termsAccepted'));

  switch (document.location.hostname.getSubdomain()) {
  case 'dashboard':
    RoutesManager.defineDashboardRoutes();
    break;
  case 'guestbird':
  case 'www':
    RoutesManager.definePublicRoutes();
    Google.loadAnalytics();
    break;
  default:
    RoutesManager.defineShopRoutes();
  }
});
