/**
 * Methods
 * @scope Server
 */

Meteor.methods({
	'AccessManager.isDashboard': function() {
		return AccessManager.isDashboard(this);
	},
	'Baskets.addItem': function (basketId, itemId) {
		return Baskets.addItem(basketId, itemId);
	},
	'Baskets.removeItem': function (basketId, itemId) {
		return Baskets.removeItem(basketId, itemId);
	},
	'Baskets.getTotalPrice': function(basketId) {
		return Baskets.getTotalPrice(basketId);
	},
	'Baskets.validateBasket': function (basketId) {
		return Baskets.validateBasket(basketId);
	}

});
