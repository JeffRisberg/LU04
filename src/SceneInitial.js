/**
 * The initial screen contains buttons and links to additional scenes.
 *
 * @author Jeff Risberg
 * @since November 2013
 */
SceneMgr.prototype.addSceneInitial = function (sceneName) {
  var that = this;

  var scene = this.createEmptyScene(sceneName);
  this.addBG(scene, "scnInitialBg");

  // layout
  var btnGo = that.createButtonConSwitchScene("btnGo", "sceneOther", 0, 0, RBS_, RBS_);
  var btnInfo = that.createButtonConPopCon("btnInfo", that.conInfo, scene, 0, 0, RBS_, RBS_);
  var menuCon = Util.createAlignContainerWithActor(VERTICAL, [btnGo, btnInfo], 10 * sf);
  menuCon.setLocation(W_ - btnGo.width - 10 * sf, (H_ - menuCon.height) / 2);
  scene.addChild(menuCon);

  var btnSetting = that.createButtonConPopCon("btnSetting", that.conSettings, scene, 0, 0, RBS_, RBS_);
  btnSetting.setLocation(10 * sf, H_ - btnSetting.height - 10 * sf);
  scene.addChild(btnSetting);

  var logoUpper = Util.createImageActorInBound(this.director, "logoUpper", 0, 0, W_ * 0.5, H_ * 0.3)
    .enableEvents(false)
    .centerAt(menuCon.x / 2, H_ * 0.35);
  scene.addChild(logoUpper);

  var logoLower = Util.createImageActorInBound(this.director, "logoLower", 0, 0, W_ * 0.5, H_ * 0.3)
    .enableEvents(false)
    .centerAt(menuCon.x / 2, H_ * 0.60);
  scene.addChild(logoLower);

  var spaceShip = new CAAT.Actor().
    setBackgroundImage(this.director.getImage('spaceShip')).
    setScale(0.5, 0.5).
    setPositionAnchor(0.5, 0.5);
  scene.addChild(spaceShip);

  // create a complex path
  var path = new CAAT.Path().
    beginPath(W_ * 0.15, H_ * 0.1).
    addLineTo(W_ * 0.80, H_ * 0.1, 'blue').
    addLineTo(W_ * 0.80, H_ * 0.9, 'red').
    addLineTo(W_ * 0.15, H_ * 0.9, 'blue').
    addLineTo(W_ * 0.15, H_ * 0.1, 'red').
    endPath();

  // add an actor to show the path.  In this case we are placing an actor bounds
  // over the whole screen, but not trapping mouse clicks.
  var path_actor = new CAAT.PathActor()
    .setBounds(0, 0, W_, H_)
    .enableEvents(false)
    .setPath(path);
  scene.addChild(path_actor);

  // setup up a path traverser for the path.
  var path_behavior = new CAAT.PathBehavior()
    .setPath(path)
    // take 10 seconds to traverse the path
    .setFrameTime(0, 10000)
    // do it continuously, not just one time
    .setCycle(true)
    // head the actor across the path to the next point.
    .setAutoRotate(true);

  CocoonJS.App.onLoadInTheWebViewSucceed.addEventListener(function () {
    that.isWebViewReady = true;
    var mobileOrWeb = Util.isMobileDevice(that.director) ? "MOBILE012" : "WEB";
  });

  /**
   * This is called by CAAT when the scene is fully loaded
   */
  scene.activated = function () {
    that.commonDoWhenSceneStart();

    spaceShip.addBehavior(path_behavior);
  };
};