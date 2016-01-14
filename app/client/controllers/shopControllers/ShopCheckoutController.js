/**
 * @controller
 * Shop Checkout Controller
 */
ShopCheckoutController = ShopBaseController.extend({
  yieldTemplates: {
    'ShopCheckoutView': {
      to: 'shopContent'
    }
  },

  data: function () {
    return {
      shop: Shops.findOne(),
      basket: Baskets.findOne()
    };
  }
});
