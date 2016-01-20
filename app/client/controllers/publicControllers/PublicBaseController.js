/**
 * @controller
 * Public Base Controller
 */

PublicBaseController = RouteController.extend({
  template: 'publicLayout',

  action: function () {
    this.render();
  }
});
