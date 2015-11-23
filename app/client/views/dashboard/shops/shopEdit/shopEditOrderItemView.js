Session.set('shopEditOrderItemView.hideClass', true)

Template.shopEditOrderItemView.rendered = function () {
  var that = this;
  var orderId = that.data._id;
  new ViewModel({
		toggleInfo: function (evt) {
      $(that.firstNode).find('.more-info').toggleClass('hide');
		},
    confirmOrder: function () {
      Orders.confirmOrder(orderId);
    },
    cancelOrder: function () {
      Orders.cancelOrder(orderId);
    }
	}).bind(this);
};
