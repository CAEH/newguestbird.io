Template.shopMainView.rendered = function () {
}

Template.shopMainView.helpers({
	hideBasketClass: function () {
		if (Baskets.hasItems()) {
			return 'animated fadeInUp';
		}
		return 'hide';
	},
	basketOpenClass: function () {
		if (Baskets.hasItems()) {
			return 'basket-open';
		}
		return '';
	}
})