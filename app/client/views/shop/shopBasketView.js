Template.shopBasketView.helpers({
	basketItemsNames: function (argument) {
		var basketItems = Baskets.getBasketItems();
		var names = _.map(basketItems, function (item, i) {
			var pluralString = '';
			var finalString = ', ';

			if (i === basketItems.length -1) {
				finalString = '';
			} else if (i === basketItems.length -2 && i !== 0) {
				finalString = ' and ';
			}
			if (item.count > 1) {
				pluralString = 's'
			}
			return item.count + ' ' + item.name + pluralString + finalString;
		});

		return names.join(' ');
	}
})
