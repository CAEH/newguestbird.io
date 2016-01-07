Template.shopEditDetailsView.rendered = function () {
	var shop = this.data.shop;
	$.fn.selected = $.fn.change; // Workaround

	new ViewModel({
		name: shop.name,
		slug: shop.slug,
		shopCurrency: shop.shopCurrency,
		description: shop.description,
		intro: shop.intro,
		availableCurrencies: availableCurrencies,
		saveShopField: function (evt) {
		  	var $el = $(evt.target);
		  	var attr = $el.attr("name");
		  	var value = $el.val();
		  	var doc = {};

		  	doc[attr] = value;
		  	console.log(doc);
		  	Shops.update(shop._id, { $set: doc });
		},
		saveImage: function (evt) {
			FS.Utility.eachFile(evt, function(file) {
				Images.saveImageFromUI(file, evt, shop._id)
			});
		}
	}).bind(this);
};

Template.shopEditDetailsView.helpers({
    dropHandlers: function() {
			var shop = this.shop;
			var evt;
      return {
          onEnter: function(event) {
            evt = event;
          },
          onDrop: function(files) {
						Images.saveImageFromUI(files[0], evt, shop._id);
          }
      };
    },
});
