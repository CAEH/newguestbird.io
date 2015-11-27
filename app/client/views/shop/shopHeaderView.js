Template.shopHeaderView.helpers({
	mainShopImage: function () {
		if (!this.shop.images) {
			return;
		}
		return this.shop.images[0];
	}
});
