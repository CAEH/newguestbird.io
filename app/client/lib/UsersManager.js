/**
 * @class UsersManager
 */
if (!Meteor.userId()) {
  Guests.add();
}

UsersManager = {
  isGuest: function () {
    return !Meteor.user();
  }
};
