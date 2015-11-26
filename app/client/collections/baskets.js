/**
 * Basket Collection functions
 * @scope client
 */

/**
 * @public
 * @return {String} itemId
 */
Baskets.createBasket = function(options) {
	var defaults = {
		shopId: Shops.findOne()._id,
		customerId: Meteor.userId(),
		createdAt: new Date(),
		lastModified: new Date(),
		isOrdered: false,
		orderedAt: undefined,
		totalPrice: undefined,
		curreny: 'shopCurrency',
		items: [],
		delivery: {
			deliveryDate: moment().format('DD.MM.YYYY'),
			deliveryTime: 'now'
		}
	};

	options = _.extend(defaults, options);

	return Baskets.insert(options, function(error, basketId) {
		if (error) {
			console.log(error);
			return;
		}
	});
};

/**
 * @public
 * Checks if user has basket
 * @return {Boolean}
 */
Baskets.hasBasket = function () {
	return !!Baskets.findOne()
};

/**
 * @public
 * Adds item to basket's items array
 * @param {String} itemId
 */
Baskets.addItemToBasket = function (itemId) {
	if (!_.isString(itemId)) {
		return;
	}

	Meteor.call('Baskets.addItem', Baskets.findOne()._id, itemId, function(error, result) {
		if (error) {
			console.log(error);
			return;
		}
	});
};

/**
 * @public
 * Removes item from basket items array
 * @param  {itemId} itemId
 */
Baskets.removeItemFromBasket = function (itemId) {
	if (!_.isString(itemId)) {
		return;
	}

	Meteor.call('Baskets.removeItem', Baskets.findOne()._id, itemId, function(error, result) {
		if (error) {
			console.log(error);
			return;
		}
	});
}

/**
 * Check if basket has items
 * @return {Boolean}
 */
Baskets.hasItems = function () {
	if (!Baskets.findOne()) {
		return;
	}
	if (!_.isArray(Baskets.findOne().items)) {
		return;
	}
	if (Baskets.findOne().items.length) {
		return true;
	}
};

/**
 * @public
 * Get items array for basket
 * @return {Array} Array of Objects
 */
Baskets.getBasketItems = function () {
	if (!Baskets.hasBasket()) {
		return;
	}
	return Baskets.findOne().items;
}

/**
 * Get Total Price for basket
 * @return {Number} Total Price
 */
Baskets.getTotalPrice = function () {
	if (!Baskets.hasBasket()) {
		return;
	}
	Meteor.call('Baskets.getTotalPrice', Baskets.findOne()._id, function(error, result) {
		if (error) {
			console.log(error);
			return;
		}
		Session.set('Baskets.basketTotalPrice', result);
	});
	return Session.get('Baskets.basketTotalPrice');
};

/**
 * Validate basket
 * @param {Function} errorCallback
 * @return {Bool}
 */
Baskets.validateBasket = function (callback) {
	if (!Baskets.hasBasket()) {
		return;
	}
	Meteor.call('Baskets.validateBasket', Baskets.findOne()._id, function(error, result) {
		if (error) {
			console.log(error);
			Session.set('Baskets.validationError', error.reason);
			callback(false)
			return;
		}
		callback(true)
	});
};

/**
 * Returns single error object depends on field given
 * @param  {String} field Field to check for errors
 * @return {Object} object contains field name and message
 */
Baskets.findBasketFieldError = function (field) {
	if (!_.isString(field)) {
		return;
	}
	return _.find(Session.get('Baskets.validationError'), function (error) {
		return error.field === field;
	});
};

Baskets.orderBasket = function (callback) {
	return Baskets.validateBasket(function(isValid) {
		if (!isValid) {
			return;
		}
		var basketId = Baskets.findOne()._id;
		Baskets.update(basketId, {$set: {isOrdered: true}}, {}, function (error, ret) {
			if (error) {
				return;
			}
			callback(basketId);
		});
	});

};
