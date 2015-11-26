Template.shopEditItemView.rendered = function () {
	var item = this.data;

	new ViewModel({
		name: item.name,
		description: item.description,
		price: item.price,
		shopSection: item.shopSection,
		saveItemField: function (evt) {
		  	var $el = $(evt.target);
		  	var attr = $el.attr("name");
		  	var value = $el.val();
		  	var doc = {};

		  	if (attr === 'price') {
		  		value = Number(value);
		  	}


		  	doc[attr] = value;
		  	console.log(doc);
		  	Items.update(item._id, { $set: doc })
		},
		removeItem: function () {
			Items.remove(item._id);
		}
	}).bind(this);
};
