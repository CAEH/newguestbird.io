Template.dashboardCreateShopView.rendered = function () {
  new ViewModel({
    createShop: function () {
      Shops.createShop({
        name: $('[name="name"]').val(),
        slug: $('[name="slug"]').val()
      }, function (error, res) {
        Router.go('shopEdit', {
          shopSlug: $('[name="slug"]').val()
        });
      });
    }
  }).bind(this);
};
