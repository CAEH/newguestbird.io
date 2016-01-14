/**
 * Shops Collection functions
 * @scope client
 */

/**
 * @param  options {Object}
 * @param  callback {Function}
 * @return shopId {String} shop id
 */

Shops.createShop = function (options, callback) {
  if (!options || !_.isString(options.slug)) {
    console.log('Must provide a slug!');
    return;
  }
  var defaults = {
    ownerId: Meteor.userId(),
    createdAt: new Date(),
    lastModified: new Date(),
    shopCurrency: 'EUR',
    active: false,
    name: undefined,
    description: undefined,
    intro: undefined,
    logo: undefined,
    sections: []
  };

  options = _.extend(defaults, options);

  return Shops.insert(options, function (error, shopId) {
    if (error) {
      console.log(error);
      if (error.error == 'SLUG_UNAVAILABLE') {
        AlertsManager.showAlert({
          message: 'Shop URL is already exist',
          type: 'danger'
        });
      } else {
        AlertsManager.showAlert({
          message: "Coudn't create shop",
          type: 'danger'
        });
      }
      return;
    }
    if (callback) {
      callback();
    }
  });
};

/**
 * @param  {String}	shopId
 * @return {Array} Items
 */
Shops.findItemsForShop = function (shopId) {
  if (!shopId || !_.isString(shopId)) {
    return;
  }

  return Items.find().fetch();
};

Shops.findShopBySlug = function (slug) {
  return Shops.findOne({
    slug: slug
  });
};
