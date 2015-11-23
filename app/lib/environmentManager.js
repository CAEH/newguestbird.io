/**
 * @class Environment Manager
 */

EnvironmentManager = {
  /**
   * @private
   * @param env {String}
   * @return {Boolean}
   */
  isEnvironment: function (env) {
    if (!_.isObject(Meteor.settings) && !_.isObject(Meteor.settings.public)) {
      return;
    }
    return Meteor.settings.public.environment === env;
  },

  /**
   * @return {Boolean}
   */
  isDevelopment: function () {
    return this.isEnvironment('development');
  },

  /**
   * @return {Boolean}
   */
  isStage: function () {
    return this.isEnvironment('stage');
  },

  /**
   * @return {Boolean}
   */
  isProduction: function () {
    return this.isEnvironment('production');
  },
}
