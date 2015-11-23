Template.shopBasketBreakdownItem.rendered = function () {
	var item = this.data;
	$("input[type=number]").number();

	new ViewModel({
		count: item.count,
		removeItemCount: function () {
			Baskets.removeItemFromBasket(item._id);
		},
		addItemCount: function () {
			Baskets.addItemToBasket(item._id)
		}
	}).bind(this);
};
