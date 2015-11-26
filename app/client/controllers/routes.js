/**
 * Routes File
 * @scope client
 */

Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFoundView',
  loadingTemplate: 'loading',
  progress: true,
  progressSpinner: false
});

Router.onAfterAction(function () {
  AlertsManager.clearAlert();
});

Meteor.subscribe('images');

RoutesMangaer = {
  defineShopRoutes: function () {
    Router.map(function() {
    	this.route('shopMain', {
    		path: '/',
    	  controller: ShopMainController
    	});

    	this.route('shopCheckout', {
    		path: '/checkout',
    	  controller: ShopCheckoutController
    	});

    	this.route('confirmation', {
    		path: '/confirmation/:basketId',
    		controller: ShopConfirmationController
    	});

    });
  },

  defineDashboardRoutes: function () {
    Router.map(function() {
      this.route('dashboardMain', {
        path: '/',
        controller: DashboardShopsController
      });

      this.route('login', {
        path: '/login',
        controller: DashboardLoginController
      });

      this.route('register', {
        path: '/register',
        controller: DashboardRegisterController
      });

      this.route('logout', {
        path: '/logout',
        controller: DashboardLogoutController
      });

      this.route('dashboardShops', {
        path: '/shops',
        controller: DashboardShopsController
      });

      this.route('createShop', {
    		path: '/new-shop',
    	  controller: DashboardCreateShopController
    	});

      this.route('shopEdit', {
    		path: '/shops/:shopSlug',
    	  controller: ShopEditController
    	});

      // Same as above but with params
    	this.route('shopEditViewContent', {
    		path: '/shops/:shopSlug/:content',
    	  controller: ShopEditController
    	});
    });
  }
}
