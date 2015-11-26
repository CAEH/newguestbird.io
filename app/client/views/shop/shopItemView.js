Template.shopItemView.rendered = function () {
	var item = Items.findOne({_id: this.data._id});

	new ViewModel({
		addToBasket: function (evt) {
			if (!Baskets.hasBasket()) {
				Baskets.createBasket({}, function () {
					Baskets.addItemToBasket(item._id);
				});
				return;
			}
			$(evt.target).closest('.shop-item').addClass('added-to-basked');
			_.delay(function() {
				$(evt.target).closest('.shop-item').removeClass('added-to-basked');
			},600)
			Baskets.addItemToBasket(item._id);
		},
		removeFromBasket: function () {
			Baskets.removeItemFromBasket(item._id);
		}
	}).bind(this);
};
