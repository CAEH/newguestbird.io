/**
 * @controller
 * Shop Main Controller
 */

ShopMainController = ShopBaseController.extend({
  yieldTemplates: {
    'shopMainView': {
      to: 'shopContent'
    }
  },

  data: function () {
    return {
      shop: Shops.findOne(),
      items: Items.find().fetch(),
      shopSections: Items.getSectionsArray()
    };
  }
});
