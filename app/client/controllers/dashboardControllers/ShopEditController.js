/**
 * @controller
 * Shop Edit Controller
 */

ShopEditController = DashboardShopsController.extend({
	yieldTemplates: {
    'shopEditView': {to: 'content'}
  },
	waitOn: function () {
		var shop = Shops.findShopBySlug(this.params.shopSlug);
		if (!shop) {
			return;
		}

		return [
			Meteor.subscribe('shops', Meteor.userId()),
			Meteor.subscribe('items', this.params.shopSlug),
			Meteor.subscribe('orders', {shopId: shop._id})
		]
	},
	data: function () {
    var ret = {
			shop: Shops.findOne({slug: this.params.shopSlug}),
			content: this.params.content
    };
    switch(this.params.content) {
      case 'items':
        ret.items = Items.find().fetch();
        break;
      case 'orders':
        ret.orders = Orders.find().fetch();
        break;
    }
		return ret;
	},

	onBeforeAction: function () {
		switch(this.params.content) {
			case 'shop-details':
				this.render('shopEditDetailsView', {to: 'shopEditContent'});
				break;
			case 'items':
				this.render('shopEditItemsView', {to: 'shopEditContent'});
				break;
			case 'orders':
				this.render('shopEditOrdersView', {to: 'shopEditContent'});
				break;
			default:
				this.render('shopEditDetailsView', {to: 'shopEditContent'});
		}
		this.next()
	}
});
