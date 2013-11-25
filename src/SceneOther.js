/**
 * The other screen is reached from the initial screen, and has a slider containing button actors, and
 * a back button.
 *
 * @author Jeff Risberg
 * @since November 2013
 */
SceneMgr.prototype.addSceneOther = function (sceneName) {
  var that = this;

  var scene = this.createEmptyScene(sceneName);
  this.addBG(scene, "scnOtherBg");

  var episodeActorList = []

  // add the back button
  var btnBack = that.createButtonConSwitchScene("btnBack", "sceneInitial", 10 * sf, 10 * sf, RBS_, RBS_);
  scene.addChild(btnBack);

  // add the title
  var title = Util.createImageActorInBound(this.director, "scnOtherTitle", W_ * 0.2, H_ * 0.05, 360, 60)
    .enableEvents(false);
  scene.addChild(title);

  var iconAnimationScaleFactor = 1.3;
  var episodeActorSize = 200 * sf;
  var sliderGap = 32 * sf;
  var sliderShiftUp = 8 * sf;
  var episodeInfoTextAreaWidth = 380 * sf;
  var episodeInfoTextAreaHeight = 120 * sf;
  var episodeInfoTexAreaPlayX = RBS_ * 2 + 100 * sf;

  if (W_ / H_ < 1.56) {
    episodeActorSize = 260 * sf;
    sliderGap = 38 * sf;
    iconAnimationScaleFactor = 1.25;
    sliderShiftUp = 18 * sf;
    episodeInfoTextAreaWidth = 350 * sf;
    episodeInfoTextAreaHeight = 250 * sf;
  }

  if (W_ / H_ > 1.94) {
    episodeInfoTexAreaPlayX = RBS_ * 2 + 100 * sf;
    episodeActorSize = 180 * sf;
    sliderGap = 30 * sf;
    iconAnimationScaleFactor = 1.25;
    sliderShiftUp = 5 * sf;
  }

  var sliderH = episodeActorSize * iconAnimationScaleFactor;//largeFrameSize
  var sliderY = (H_ - sliderH) / 2 - sliderShiftUp;//slider start position

  var slider = new Slider(scene, this.director);
  scene.addChild(slider);
  slider.setSliderBounds(0, sliderY, W_, sliderH);

  var sliderBottomHeight = 0.18 * H_ + sliderH;
  slider.setGap(sliderGap);

  // play or unlock and text of the episode info on the left
  var playH = 100 * sf;
  var playHWRatio = 2.5;

  var playX = W_ - playH * playHWRatio - 20 * sf;
  var playY = sliderY + sliderH + 20 * sf;

  var episodeTitleAreaLockedX = sliderGap * 2;
  var buttonPlay = that.createButtonConSwitchScene("btnPlay", "btnLoad", playX, playY, playH * playHWRatio, playH);//switchScene is defined in scene Mangaer
  scene.addChild(buttonPlay);

  var episodeTitleArea = new WrapFont("Welcome, tap an episode", 30 * sf, FONT_COLOR).
    setBounds(episodeInfoTexAreaPlayX, playY, episodeInfoTextAreaWidth, 40 * sf);
  scene.addChild(episodeTitleArea);

  // add the episodes to the slider
  for (var i = 0; i < 2; i++) {
    createOneEpisode("Alpha", false);
    createOneEpisode("Beta", false);
    createOneEpisode("Gamma", false);
    createOneEpisode("Delta", false);
  }

  function createOneEpisode(episodeName, hasLock) {

    function pressDoCommon() {
      //that.episodeMgr.setIndex(episodeName);
    }

    function pressDoUnlocked() {
      pressDoCommon();

      episodeTitleArea.setText(episodeName);
      episodeTitleArea.setBounds(episodeInfoTexAreaPlayX, playY, 380 * sf, 100 * sf);

      buttonPlay.setVisible(true);
      //buttonUnlock.setVisible(false);
      //leftLowerCon.setVisible(true);
    }

    function pressDoLocked() {
      pressDoCommon();
      buttonPlay.setVisible(false);
      episodeTitleArea.setVisible(false);

      if (true) {
        //buttonUnlock.setVisible(true);
        episodeTitleArea.setText(msgWithLock);
        leftLowerCon.setVisible(false);

        // episodeTitleArea.setLocation(episodeInfoTextAreaLockedX, playH);
        Util.changeActorPressDo(buttonUnlock, buttonUnlockDoEachEpisode);
      }
    }

    function buttonUnlockDoEachEpisode() {
      if (episodeActor.tryUnlockSuccess()) {
        //resetStarLevel();
        pressDoUnlocked();
      }
    }

    var episodeActor = new LockActor(that.director, episodeName, pressDoUnlocked, null, false)
      .setSlider(slider)
      .setPressDoScaleFactor(iconAnimationScaleFactor)
      .setSizeMy(episodeActorSize, episodeActorSize);

    episodeActorList.push(episodeActor);
    return Util.createConWrapper(episodeActor);
  };

  /**
   * This is called by CAAT when the scene is fully loaded
   */
  scene.activated = function () {
    that.commonDoWhenSceneStart();
  };
};

