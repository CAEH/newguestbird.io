Template.shopEditItemView.events({
  'click .duplicate-item-btn': function (evt) {
    Items.createItem(this.shopId, {
      shopSection: this.shopSection,
      name: this.name,
      description: this.description,
      price: this.price
    });
  },
  'click .remove-item-btn': function (evt) {
    Items.remove(this._id);
  },
  'keyup input': function (evt) {
    var $el = $(evt.target);
    var attr = $el.attr('name');
    var value = $el.val();
    var doc = {};

    if (attr === 'price') {
      value = Number(value);
    }

    doc[attr] = value;
    Items.update(this._id, {
      $set: doc
    });
  }
});
