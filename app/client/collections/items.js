/**
 * Items Collection functions
 * @scope client
 */

/**
 * @param  {String} shopId
 * @param  {Object}	options
 * @return {String} itemId
 */
Items.createItem = function (shopId, options) {
  if (!shopId || !_.isString(shopId)) {
    return;
  }

  var defaults = {
    shopId: shopId,
    createdAt: new Date(),
    lastModified: new Date(),
    shopSection: undefined,
    name: undefined,
    description: undefined,
    price: undefined,
    active: false
  };

  options = _.extend(defaults, options);

  return Items.insert(options, function (error, itemId) {
    if (error) {
      console.log(error);
      return;
    }
  });
};

/**
 * @return {Array} sections
 */
Items.getShopSections = function () {
  return _.uniq(_.map(Items.find().fetch(), function (item) {
    return item.shopSection;
  }));
};

/**
 * @param  {String} section
 * @return {Array} items
 */
Items.getSectionItems = function (section) {
  if (!section || !_.isString(section)) {
    return;
  }
  return Items.find({
    shopSection: section
  }).fetch();
};

Items.getSectionsArray = function () {
  return _.map(Items.getShopSections(), function (section, index) {
    return {
      name: section,
      number: index + 1,
      items: Items.getSectionItems(section)
    };
  });
};
