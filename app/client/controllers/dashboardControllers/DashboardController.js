/**
 * @controller
 * Dashboard Controller
 */

DashboardController = RouteController.extend({
  template: 'dashboardView',
  onBeforeAction: function () {
    if (UsersManager.isGuest()) {
      Router.go('login');
    }
    this.next();
  }
});

DashboardLoginController = DashboardController.extend({
  template: 'dashboardLoginView'
});

DashboardRegisterController = DashboardController.extend({
  template: 'dashboardRegisterView'
});

DashboardLogoutController = DashboardController.extend({
  action: function () {
    Meteor.logout(function () {
      window.location = 'http://guestbird.com';
    });
  }
});

DashboardShopsController = DashboardController.extend({
  yieldTemplates: {
    'dashboardShopsView': {
      to: 'content'
    }
  },

  waitOn: function () {
    return [
      Meteor.subscribe('shops', Meteor.userId())
    ];
  },

  data: function (argument) {
    return {
      shops: Shops.find().fetch(),
      content: 'shops'
    };
  }
});

DashboardCreateShopController = DashboardController.extend({
  yieldTemplates: {
    'dashboardCreateShopView': {
      to: 'content'
    }
  },
  
  waitOn: function () {
    return [
      Meteor.subscribe('shops', Meteor.userId())
    ];
  }
});
