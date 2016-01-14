/**
 * @class Access Manager
 */

AccessManager = {
  getSubdomain: function (session) {
    var host = session.connection.httpHeaders.host;
    return host.slice(0, host.indexOf('.'));
  },
  getShopBySubdomain: function (session) {
    return Shops.find({
      slug: this.getSubdomain(session)
    });
  },
  getItemsBySubdomain: function (session) {
    return Items.find({
      shopId: this.getShopBySubdomain(session).fetch()[0]._id
    });
  },
  isDashboard: function (session) {
    return this.getSubdomain(session) === 'dashboard';
  }
};
