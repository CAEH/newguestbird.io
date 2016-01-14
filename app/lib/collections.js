/**
 * Decalring collections
 * @scope Both
 */

/**
 * Shops Collection
 * @type {Meteor Collection}
 */
Shops = new Meteor.Collection('shops');

/**
 * Items Collection
 * @type {Meteor Collection}
 */
Items = new Meteor.Collection('items');

/**
 * Baskets Collection
 * @type {Meteor Collection}
 */
Baskets = new Meteor.Collection('baskets');

/**
 * Orders Collection
 * @type {Meteor Collection}
 */
Orders = new Meteor.Collection('orders');

/**
 * Images Collection
 * @type {Meteor Collection}
 */
var imageStore = new FS.Store.GridFS('images');

Images = new FS.Collection('images', {
  stores: [imageStore]
});
