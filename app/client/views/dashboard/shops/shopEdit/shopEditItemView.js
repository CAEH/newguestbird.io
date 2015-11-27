Template.shopEditItemView.events({
	'click .remove-item-btn': function (evt) {
		Items.remove(this._id);
	},
	'keyup input': function (evt) {
		var $el = $(evt.target);
		var attr = $el.attr("name");
		var value = $el.val();
		var doc = {};

		if (attr === 'price') {
			value = Number(value);
		}

		doc[attr] = value;
		Items.update(this._id, { $set: doc });
	}
})
