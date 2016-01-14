Template.registerHelper('shopUrl', function (shopSlug) {
  return 'http://' + shopSlug + '.' + Meteor.settings.public.rootDomain;
});
