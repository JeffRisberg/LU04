/**
 * The UserInfo object...
 *
 * @author Linghua, Jeff
 * @since April 2013
 */
function UserInfo(director) {
  this.userId = undefined;
  //this.level = new UserLevel();
  //this.money = new MoneyMgr();
  //this.lock = new LockMgr(director);
  //this.score = new UserGameScore();
  //this.achievement = new AchievementMgr(director, this.money);
  this.settings = new Settings();
  //this.equip = new UserEquip(this.lock);
  //this.license = new UserLicense(this.lock);
  //this.facebookInfo = new FacebookInfo(director);
  //this.misc = new UserMisc();
  //this.character = new UserCharacter(this.lock);

  this.groupTogether = [
    //this.level
    //, this.money
    //, this.lock
    //, this.score
    //, this.achievement
    this.settings
    //, this.equip
    //, this.license
    //, this.misc
    //, this.character
  ];

  // other attributes;
  this.init();
}

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
  // start to reset
  for (var i = 0; i < this.groupTogether.length; ++i) {
    var obj = this.groupTogether[i];
    obj.resetUser(this.storeId);
  }
};

UserInfo.prototype.resetOthers = function () {
  // start to reset
  //this.level.resetLevel();
  //this.money.resetMoney();
  //this.lock.resetStorage();
  //this.score.resetValue();
  //this.equip.resetEquip();

  this.setting.resetAllSetting();
  //this.achievement.resetAllGroup();
  //this.license.resetLicense();
  //this.misc.resetMisc();
  //this.character.resetCharacter();
};

UserInfo.prototype.init = function () {
  this.isLoggedIn = false;
  this.userName = "Africa Swinger";
};

UserInfo.prototype.getUserName = function () {
  return this.userName;
};
