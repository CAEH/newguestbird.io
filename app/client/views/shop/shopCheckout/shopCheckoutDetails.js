Template.shopCheckoutDetails.rendered = function () {
	var basket = Baskets.findOne();

	var viewModel = new ViewModel({
		roomNumber: basket.delivery.roomNumber,
		email: basket.delivery.email,
		fullName: basket.delivery.fullName,
		phone: basket.delivery.phone,

		identifyBy: function (arg) {
			$('.checkout-identification .checkout-form-group').addClass('hide');
			$('.checkout-identification .checkout-form-group[data-content="' + arg + '"]').removeClass('hide');
		},

		deliveryAt: function (arg) {
			$('.checkout-delivery-time .checkout-form-group').addClass('hide');
			$('.checkout-delivery-time .checkout-form-group[data-content="' + arg + '"]').removeClass('hide');

			if (arg === 'now') {
				this.setToday();
				this.setNow();
			}
			if (arg === 'today') {
				this.setToday();
			}
		},

		setToday: function () {
			Baskets.update(Baskets.findOne()._id, { $set: { 'delivery.deliveryDate': 'today' }});
		},

		setNow: function () {
			Baskets.update(Baskets.findOne()._id, { $set: { 'delivery.deliveryTime': 'now' }});
		},

		saveBasketDeliveryField: function (evt) {
		  	var $el = $(evt.target);
		  	var attr = 'delivery.' + $el.attr("name");
		  	var value = $el.val();
		  	var doc = {};

		  	doc[attr] = value;
		  	Baskets.update(Baskets.findOne()._id, { $set: doc });
		}
	}).bind(this);

	$('.timepicker').pickatime({
		onSet: function () {
			Baskets.update(Baskets.findOne()._id, { $set: {'delivery.deliveryTime': this.get('select', 'HH:i')} });
		}
	});

	$('.datepicker').pickadate({
		min: true,
		onSet: function (evt) {
			Baskets.update(Baskets.findOne()._id, { $set: {'delivery.deliveryDate': this.get('select', 'dd.mm.yyyy')} });
		}
	});
}

Template.shopCheckoutDetails.helpers({
	hasErrorClass: function (field) {
		if (!Baskets.findBasketFieldError(field)) {
			return;
		}
		return 'has-error';
	}
});

Template.shopCheckoutDetails.events({
	'submit .checkout-form': function (evt) {
		evt.preventDefault();
		Baskets.orderBasket(function (basketId) {
			Router.go('confirmation', {basketId: basketId});
		});
	}
});
