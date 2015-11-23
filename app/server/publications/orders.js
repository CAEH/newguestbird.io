/**
 * Order Publication
 * @scope server
 */

Meteor.publish('orders', function(doc) {
  return Orders.find(doc);
});

Orders.allow({
	insert: function (userId, doc) {
		// only server is allowed to insert
		return false;
	},
	remove: function () {
		// order cannot be removed by user
		return false;
	},
	update: function(userId, doc, fields, modifier) {
		return userId === Shops.getOwnerId(doc.shopId) || userId === Orders.getCustomerId(doc._id);
	}
});

/**
 * Copying basket into a new order
 * @param basketId {String}
 * @param callback {Function}
 * @return orderId {String}
 */
Orders.insertOrder = function (basketId, callback) {
  console.log('inserting order');
	var basket = _.clone(Baskets.findOne(basketId));
	var options = {
		basketId: basket._id,
		shopId: Baskets.findOne(basketId).shopId,
    customerId: basket.customerId,
    items: basket.items,
    curreny: basket.curreny,
    createdAt: new Date(),
    lastModified: new Date(),
    delivery: basket.delivery,
    totalPrice: Baskets.getTotalPrice(basket._id),
    basketData: basket
	};

	Orders.insert(options, function (err) {
    if (err) {
      return;
    }
    callback();
	});
};

Orders.getCustomerId = function (orderId) {
  return Orders.findOne(orderId).customerId;
};
