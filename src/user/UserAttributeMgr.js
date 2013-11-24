/**
 * Local Storage Generator
 *
 * @param prefix
 * @constructor
 */
function UserAttributeMgr(prefix) {
  this.prefix = prefix;
  this.updateServerInterval = 10; // second
  this.lastUpdateTime = 0; // second
}

// the path is made up from a prefix and a user Id
UserAttributeMgr.prototype.getPath = function () {
  if (!this.userId) {
    console.error("userId not valid");
    return "";
  }
  if (Util.isTrailVersion()) {
    return this.prefix + "_trail_" + this.userId + "_";
  }
  return this.prefix + "_" + this.userId + "_";
};

UserAttributeMgr.prototype.setValue = function (value, item) {
  item = item || "";
  if (DEBUG_.userAtt) {
    console.error("set " + this.getPath() + item + " : " + value);
  }
  localStorage.setItem(this.getPath() + item, value);
};

UserAttributeMgr.prototype.getValue = function (item) {
  item = item || "";
  if (DEBUG_.userAtt) {
    console.log("get " + this.getPath() + item + ":" + localStorage.getItem(this.getPath() + item));
  }
  return localStorage.getItem(this.getPath() + item);
};

// establish a different user for the UA manager
UserAttributeMgr.prototype.resetUser = function (userId) {
  this.userId = userId;
};
