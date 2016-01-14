/**
 * @controller
 * Shop Confirmation Controller
 */

ShopConfirmationController = ShopBaseController.extend({
  yieldTemplates: {
    'ShopConfirmationView': {
      to: 'shopContent'
    }
  },

  waitOn: function () {
    return [
      Meteor.subscribe('shops'),
      Meteor.subscribe('orders', {
        basketId: this.params.basketId
      })
    ];
  },

  action: function () {
    if (!Orders.findOne()) {
      this.render('notFoundView');
      return;
    }
    this.render();
  },

  data: function () {
    return {
      shop: Shops.findOne(),
      order: Orders.findOne()
    };
  }
});
