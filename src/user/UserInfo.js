/**
 * The UserInfo object...
 *
 * @author Linghua Jin
 * @since April 2013
 */
function UserInfo(director) {
  this.userId = undefined;
  this.settings = new Settings();

  this.groupTogether = [
    this.settings
  ];

  // other attributes;
  this.init();
}

UserInfo.prototype.init = function () {
  this.isLoggedIn = false;
  this.userName = "Africa Swinger";
};

UserInfo.prototype.resetAll = function () {
  this.resetTopUser(this.userName);

  return true;
};

UserInfo.prototype.resetTopUser = function (userName) {
  this.storeId = userName;

  // process other attributes
  this.initOthers();
  this.lock.initAllGroupSt(this.isUserLoggedIn());
};

UserInfo.prototype.initOthers = function () {
  for (var i = 0; i < this.groupTogether.length; ++i) {
    var obj = this.groupTogether[i];
    obj.resetUser(this.storeId);
  }
};

UserInfo.prototype.resetOthers = function () {
  this.settings.resetAllSetting();
};

UserInfo.prototype.getUserName = function () {
  return this.userName;
};
