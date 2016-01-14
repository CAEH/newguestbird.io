/**
 * @controller
 * Shop Base Controller
 */

ShopBaseController = RouteController.extend({
  template: 'shopLayout',

  waitOn: function () {
    return [
      Meteor.subscribe('shops'),
      Meteor.subscribe('items'),
      Meteor.subscribe('baskets', Meteor.userId())
    ];
  },

  action: function () {
    if (!Shops.findOne()) {
      this.render('notFoundView');
      return;
    }
    this.render();
  }
});
