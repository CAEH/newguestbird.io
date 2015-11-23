/**
 * Items Publish
 * @scope Server
 */

Meteor.publish('items', function(shopSlug) {
  if (shopSlug) {
    return Items.find({ shopId: Shops.findOne({ slug: shopSlug })._id });
  }
  return AccessManager.getItemsBySubdomain(this);
});
