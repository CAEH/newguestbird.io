Template.shopEditItemsView.rendered = function () {
  var shop = this.data.shop;

  new ViewModel({
    addItem: function () {
      Items.createItem(shop._id);
    }
  }).bind(this);
};
