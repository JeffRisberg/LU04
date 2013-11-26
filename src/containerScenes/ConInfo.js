/**
 * This builds the container which has info, such a game credits.  Notice that a containing group is added
 * first, called "topCon", the additional actors are added to this.  Hence, to destroy whole group, we
 * just destroy the topCon.
 *
 * This container is added to the Initial scene.
 *
 * @author Linghua, Jeff
 * @since early 2013
 */
SceneMgr.prototype.conInfo = function (parent) {
  var that = this;
  var topCon = that.createConBG();

  function destroyTopCon() {
    Util.destroyObj(topCon);
    that.conReturnCommonDo();
  }

  var goBackButton = Util.createButtonConWithImageFunInBound(that.director, "btnBack", destroyTopCon, 10 * sf, 10 * sf, RBS_, RBS_);
  topCon.addChild(goBackButton);

  var bgX = goBackButton.x + RBS_ + 2 * sf;
  var containerBg = Util.createImageConInBound(that.director, "containerBg", bgX, H_, W_ - bgX, H_);
  containerBg.setLocation(bgX, 0.01 * H_);
  topCon.addChild(containerBg);

  var infoImgConH = containerBg.height * 0.8;

  if (W_ / H_ < 1.8) {
    infoImgConH = containerBg.height * 0.7;
  }
  if (W_ / H_ < 1.5) {
    infoImgConH = containerBg.height * 0.6;
    buttonX = -0.08 * containerBg.width;
  }
  var infoImgConW = infoImgConH * 1.5;

  // The info img con will hold whichever image is selected
  var infoImgCon = Util.createImageActorWH(that.director, "picGameCredit", infoImgConW, infoImgConH);
  infoImgCon.centerAt(containerBg.width / 2, containerBg.height / 2);

  var buttonL = 200 * sf;
  var buttonW = 80 * sf;
  var buttonX = infoImgCon.x - 150 * sf;
  var buttonY = infoImgCon.y + 50 * sf;

  function pressInfoBtnDo(imageName) {
    Util.changeActorImg(that.director, infoImgCon, imageName);
  }

  var btnGameCredit = Util.createButtonWithImageFunWH(that.director, "btnGameCredit", function () {
    pressInfoBtnDo("picGameCredit")
  }, buttonL, buttonW);
  var btnMusicCredit = Util.createButtonWithImageFunWH(that.director, "btnMusicCredit", function () {
    pressInfoBtnDo("picMusicCredit")
  }, buttonL, buttonW);

  var btnCon = Util.createAlignContainerWithActor(VERTICAL, [btnGameCredit, btnMusicCredit]);
  btnCon.setLocation(buttonX, buttonY);
  containerBg.addChild(btnCon);
  containerBg.addChild(infoImgCon);

  return topCon;
};
