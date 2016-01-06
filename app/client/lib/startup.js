Meteor.startup(function () {
	Session.set("termsAccepted", localStorage.getItem("termsAccepted"));

	if (document.location.hostname.getSubdomain() === "dashboard") {
    RoutesMangaer.defineDashboardRoutes();
    return;
  }
  RoutesMangaer.defineShopRoutes();
});
