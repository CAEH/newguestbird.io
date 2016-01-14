 Meteor.startup(function () {
   // Password protect on development and staging
   if (EnvironmentManager.isDevelopment() || EnvironmentManager.isStage()) {
     if (Meteor.settings.public.basicAuth) {
       var basicAuth = new HttpBasicAuth(Meteor.settings.public.basicAuth.user, Meteor.settings.public.basicAuth.password);
       basicAuth.protect();
     }
   }
 });
