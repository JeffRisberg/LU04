/**
 * This builds the container which has the settings controls.
 *
 * This container is added to the Initial scene.
 *
 * @author Linghua, Jeff
 * @since early 2013
 */
SceneMgr.prototype.conSettings = function (parent) {
  var that = this;
  var topCon = that.createConBG();
  var userSettings = that.userInfo.settings;

  function destroyTopCon() {
    Util.destroyObj(topCon);
    that.conReturnCommonDo();
  }

  var settingFontSize = 40 * sf;
  var settingFontColor = FONT_COLOR;

  var settingImage = ["btnEmpty", "btnChecked"];
  var groups = userSettings.getGroupAsArray();
  var rbsSmall = 75 * sf;

  // create image change button
  function createSettingButton(groupName, applyFun) {

    function pressDo(e, isToOn) {
      var actor = that.getActorFromEvent(e);
      Util.changeActorImg(that.director, actor, settingImage[isToOn]);
      userSettings.setValue(isToOn, groupName);
      actor.isSettingOn = isToOn;
      if (applyFun) {
        applyFun(isToOn);
      }
    }

    function pressActorDo(e) {
      var actor = that.getActorFromEvent(e);
      // go to the revert status
      pressDo(e, actor.isSettingOn ? 0 : 1);
    }

    var button = Util.createButtonWithImageFunWH(that.director, settingImage[0],
      pressActorDo, rbsSmall, rbsSmall);
    button.isSettingOn = userSettings.getValue(groupName);
    Util.changeActorImg(that.director, button, settingImage[button.isSettingOn]);

    return button;
  }

  function createOneSettingRow(group, applyFun) {
    var groupName = group.name;
    var groupMsg = group.msg;
    var button = createSettingButton(groupName, applyFun);
    var settingTextArea = new WrapFont(groupMsg, settingFontSize, settingFontColor).setSize(300 * sf, rbsSmall);
    var con = Util.createAlignContainerWithActor(HORIZONTAL, [button, settingTextArea]);
    return con;
  }

  var goBackButton = Util.createButtonConWithImageFunInBound(that.director, "btnBack", destroyTopCon, 10 * sf, 10 * sf, RBS_, RBS_);
  topCon.addChild(goBackButton);

  var bgX = goBackButton.x + RBS_ + 2 * sf;
  var settingsConBg = Util.createImageConInBound(that.director, "settingsConBg", bgX, H_, W_ - bgX, H_ * 0.9);
  settingsConBg.setLocation(bgX, 0.05 * H_);
  topCon.addChild(settingsConBg);

  /*
   "Sound Fx" : 1,
   "Bg Music" : 1,
   "Gaming Music" : 1,
   "Arrow Control" : 1,
   "Position Bar" : 1,
   "Device Performance":1,2,3
   */
  if (Util.isFacebookOn()) {
    var btnFacebookWall = createOneSettingRow(groups[6])
  }

  var upperCon = Util.createAlignContainerWithActor(VERTICAL, [
    createOneSettingRow(groups[0], applySoundSetting),
    createOneSettingRow(groups[1], applyMusicSetting)
    // btnFacebookWall
  ], 10 * sf);
  upperCon.setLocation(60 * sf, settingsConBg.height * 0.15);

  var lowerCon = Util.createAlignContainerWithActor(VERTICAL, [
    createOneSettingRow(groups[2]),
    createOneSettingRow(groups[3]),
    createOneSettingRow(groups[4]),
    createOneSettingRow(groups[5])
  ], 10 * sf);
  lowerCon.setLocation(upperCon.x + settingsConBg.width * 0.4, upperCon.y);

  settingsConBg.addChild(upperCon).addChild(lowerCon);

  if (DEBUG_.additionalButton) {
    function resetDo() {
      that.userInfo.resetOthers();
      that.userPanel.resetAll(that.userInfo);
      that.audioMgr.resetValue();
      // reset all locker to be on
    }

    var resetBtn = Util.createButtonWithTextFun("reset all user data", resetDo);
    resetBtn.setLocation(W_ - resetBtn.width * 2, H_ - resetBtn.height * 2);
    topCon.addChild(resetBtn);
  }

  function applySoundSetting(value) {
    that.director.setSoundEffectsEnabled(value);
  }

  function applyMusicSetting(value) {
    if (value) {
      that.audioMgr.resetBgAudio();
    } else {
      that.audioMgr.audio.pause();
      that.audioMgr.audio.src = "";
    }
  }

  return topCon;
};
