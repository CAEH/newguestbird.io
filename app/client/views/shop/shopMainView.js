Template.shopMainView.events({
  'submit #accept-terms': function (event) {
    event.preventDefault();
    localStorage.setItem('termsAccepted', 'true'); // to persist (is used in startup.js)
    Session.set('termsAccepted', localStorage.getItem('termsAccepted')); // to make it reactive
  }
});

Template.shopMainView.rendered = function () {};

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
  },
  termsAccepted: function () {
    if (Session.get('termsAccepted') == 'true') {
      return true;
    } else {
      return false;
    }
  }
});
