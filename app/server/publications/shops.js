/**
 * Shops Publish
 * @scope Server
 */

Meteor.publish('shops', function(userId) {
  if (userId) {
    return Shops.find({ownerId: userId});
  }
  return AccessManager.getShopBySubdomain(this);
});

Shops.getOwnerId = function (shopId) {
  return Shops.findOne(shopId).ownerId;
};

Shops.allow({
	insert: function (userId, doc) {
      // is guest
      if (!Meteor.users.findOne(userId).emails) {
        return false;
      }
      // slug exists
		  if (Shops.findOne({slug: doc.slug})) {
        throw new Meteor.Error('SLUG_UNAVAILABLE');
        return false;
      }
      return true;
	},
  update: function (userId, doc, fields, modifier) {
    // not owner
    if (userId !== doc.ownerId) {
      return false;
    }
    return true;
  },
  remove: function (userId, doc) {
    // not owner
    if (userId !== doc.ownerId) {
      return false;
    }
    return true;
  }
});
