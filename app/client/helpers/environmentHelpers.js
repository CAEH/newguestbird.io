Template.registerHelper('isDevelopment', function (a, b) {
    return EnvironmentManager.isDevelopment();
});

Template.registerHelper('isStage', function (a, b) {
    return EnvironmentManager.isStage();
});

Template.registerHelper('isProduction', function (a, b) {
    return EnvironmentManager.isProduction();
});
