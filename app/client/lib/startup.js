Meteor.startup(function () {
  if (document.location.hostname.getSubdomain() === "dashboard") {
    RoutesMangaer.defineDashboardRoutes();
    return;
  }
  RoutesMangaer.defineShopRoutes();
});
