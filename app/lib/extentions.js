
String.prototype.getSubdomain = function () {
  return this.valueOf().slice(0, this.valueOf().indexOf('.'));
};
