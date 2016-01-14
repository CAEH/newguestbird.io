Template.shopBasketBreakdown.helpers({
  basketItems: function () {
    return Baskets.getBasketItems();
  },
  totalBasketPrice: function () {
    return Baskets.getTotalPrice();
  }
});
