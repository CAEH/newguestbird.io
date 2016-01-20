/**
 * @controller
 * Public Home Controller
 */

PublicHomeController = PublicBaseController.extend({
  yieldTemplates: {
    'publicHomeView': {
      to: 'publicContent'
    }
  }
});
