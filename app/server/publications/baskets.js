/**
 * Basket Publish
 * @scope Server
 */

Meteor.publish('baskets', function(userId) {
  return Baskets.find({customerId: userId});
});

Baskets.allow({
	insert: function (userId, doc) {
		// Do not allow more than one basket per user per shop
		if (Baskets.findOne({customerId: userId, shopId: doc.shopId})) {
			return false;
		}
		return true;
	},
	update: function(userId, doc, fields, modifier) {
		return userId === doc.customerId;
	}
});

Baskets.find().observeChanges({
	changed: function (fields, id) {
    Baskets.onBasketChange(fields, id)
  }
});

/**
 * @public
 * Checks if user has basket
 * @param {String} basketId
 * @return {Boolean}
 */
Baskets.hasItems = function (basketId) {
	var basket = Baskets.findOne(basketId);
	if (!basket) {
		return;
	}
	if (!_.isArray(basket.items)) {
		return;
	}
	if (basket.items.length) {
		return true;
	}
};

/**
 * @public
 * Add item to basket items array
 * @param basketId {String}
 * @param itemId {String}
 */
Baskets.addItem = function (basketId, itemId) {
  var basket = Baskets.findOne(basketId);
  var existingItem = Baskets.getExistingItem(basket, itemId);

  if (existingItem) {
    Baskets.update({_id: basketId, "items._id" : itemId},
    { $set: { 'items.$.count': existingItem.count + 1 } });
  } else {
    var item = Items.findOne(itemId);
    item.count = 1;
	  Baskets.update(basketId, { $push: { items: item } });
  }
};

/**
 * @private
 * Find for existing item in basket
 * @param basketId {String}
 * @param itemId {String}
 * @return item {Object}
 */
Baskets.getExistingItem = function (basket, itemId) {
  return _.find(basket.items, function (item) {
    return item._id === itemId;
  });
};

/**
 * @public
 * Removes item from basket items array
 * @param basketId {String}
 * @param itemId {String}
 */
Baskets.removeItem = function (basketId, itemId) {
  if (!_.isString(itemId)) {
		return;
	}

	var basket = Baskets.findOne(basketId);
  var existingItem = Baskets.getExistingItem(basket, itemId);

  if (existingItem.count > 1) {
    Baskets.update({_id: basketId, "items._id" : itemId},
    { $set: { 'items.$.count': existingItem.count - 1 } });
  } else {
    var item = Items.findOne(itemId);
    item.count = 1;
	  Baskets.update(basketId, { $pop: { items: {_id: itemId} } });
  }
};

/**
 * @public
 * When basket changes
 * @param fields {Object}
 * @param basketId {String}
 */
Baskets.onBasketChange = function (basketId, fields) {
	if (fields.isOrdered) {
		Baskets.onBasketOrdered(basketId, fields)
	}
};

/**
 * @private
 * Insert a new order when basket is ordered (isOrdered === true)
 * @param fields {Object}
 * @param basketId {String}
 */
Baskets.onBasketOrdered = function (basketId, fields) {
  console.log('onBasketOrdered!');
	Orders.insertOrder(basketId, function () {
	  Baskets.remove(basketId);
	});
};

/**
 * @public
 * Get Total Price for basket
 * @return {Number} Total Price
 */
Baskets.getTotalPrice = function (basketId) {
	if (!Baskets.hasItems(basketId)) {
		return [];
	}

	var price = _.reduce(_.map(Baskets.findOne(basketId).items, function(item) {
		return item.price * item.count;
	}), function (m, n) {
	  return m + n;
	});

	return Math.round( price * 100 ) / 100;
};

/**
 * Validating basket
 * @param basketID {String}
 * @return isValid {Boolean} true for valid, false for invalid
 */
Baskets.validateBasket = function (basketId) {
	var basket = Baskets.findOne(basketId);
	var errors = [];
	if (!basket.items || !basket.items.length) {
		errors.push({
			field: 'items',
			message: TAPi18n.__('shop-checkout.errors.no-items')
		});
	} else if (!_.isObject(basket.delivery) || !basket.delivery.deliveryTime || !basket.delivery.deliveryDate) {
		errors.push({
			field: 'delivery-time',
			message: TAPi18n.__('shop-checkout.errors.no-delivery-time-or-date')
		});
	} else if (!basket.delivery.fullName) {
		errors.push({
			field: 'fullName',
			message: TAPi18n.__('shop-checkout.errors.no-fullName')
		});
  }

	if (errors.length) {
		throw new Meteor.Error('BASKET_INVALID', errors);
		return false;
	}

	return true;
}
