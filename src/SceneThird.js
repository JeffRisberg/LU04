/**
 * The other screen is reached from the initial screen, and has a slider containing button actors, and
 * a back button.
 *
 * @author Jeff Risberg
 * @since November 2013
 */
SceneMgr.prototype.addSceneThird = function (sceneName) {
  var that = this;

  var scene = this.createEmptyScene(sceneName);
  this.addBG(scene, "scnOtherBg");

  // add the back button
  var btnBack = that.createButtonConSwitchScene("btnBack", "sceneInitial", 10 * sf, 10 * sf, RBS_, RBS_);
  scene.addChild(btnBack);

  // add the title
  var title = Util.createImageActorInBound(this.director, "scnOtherTitle", W_ * 0.2, H_ * 0.1, 300, 100)
    .enableEvents(false);
  scene.addChild(title);

  // add the slider elements

  /**
   * This is called by the CAAT when the scene is fully loaded
   */
  scene.activated = function () {
    that.commonDoWhenSceneStart();
  };
};

