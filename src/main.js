(function () {
  window['MY_DATE'] = new Date();

  CAAT.DEBUG = true;
  CAAT.TOUCH_BEHAVIOR = CAAT.TOUCH_AS_MULTITOUCH;

  function createScenes(sceneMgr) {
    sceneMgr.addSceneInitial("sceneInitial");
    sceneMgr.addSceneOther("sceneOther");
    sceneMgr.addSceneThird("sceneThird");

    sceneMgr.director.switchToNextScene(500, true, false);
  }

  var loadingImages = [
    {id: "general", url: R_ + "/images/general.png"},
    {id: "buttons", url: R_ + "/images/buttons.png"},
    {id: "pause", url: R_ + "/images/pause.png"},
    {id: "btnBack", url: R_ + "/images/btnBack.png"},
    {id: "btnPlay", url: R_ + "/images/btnPlay.png"},
    {id: "containerBg", url: R_ + "/images/containerBg.png"},
    {id: "settingsConBg", url: R_ + "/images/settingsConBg.png"},

    {id: "scnInitialBg", url: R_ + "/images/scnInitial/bg.png"},
    {id: "logoUpper", url: R_ + "/images/scnInitial/logoUpper.png"},
    {id: "logoLower", url: R_ + "/images/scnInitial/logoLower.png"},
    {id: "spaceShip", url: R_ + "/images/scnInitial/spaceShip.png"},
    {id: "btnGo", url: R_ + "/images/scnInitial/btnGo.png"},
    {id: "btnInfo", url: R_ + "/images/scnInitial/btnInfo.png"},
    {id: "btnThird", url: R_ + "/images/scnInitial/btnThird.png"},
    {id: "btnSetting", url: R_ + "/images/scnInitial/btnSetting.png"},
    {id: "btnEmpty", url: R_ + "/images/scnInitial/btnEmpty.png"},
    {id: "btnChecked", url: R_ + "/images/scnInitial/btnChecked.png"},

    {id: "btnGameCredit", url: R_ + "/images/scnInfo/btnGameCredit.png"},
    {id: "btnMusicCredit", url: R_ + "/images/scnInfo/btnMusicCredit.png"},
    {id: "picGameCredit", url: R_ + "/images/scnInfo/picGameCredit.png"},
    {id: "picMusicCredit", url: R_ + "/images/scnInfo/picMusicCredit.png"},

    {id: "scnOtherBg", url: R_ + "/images/scnOther/bg.png"},
    {id: "scnOtherTitle", url: R_ + "/images/scnOther/title.png"},
    {id: "Alpha", url: R_ + "/images/scnOther/Alpha.png"},
    {id: "Beta", url: R_ + "/images/scnOther/Beta.png"},
    {id: "Gamma", url: R_ + "/images/scnOther/Gamma.png"},
    {id: "Delta", url: R_ + "/images/scnOther/Delta.png"},
    {id: "lock", url: R_ + "/images/scnOther/lock.png"},
    {id: "lock2", url: R_ + "/images/scnOther/lock2.png"},

    {id: "scnThirdBg", url: R_ + "/images/scnThird/bg.png"},
    {id: "pointsImg", url: R_ + "/images/scnThird/points.png"},
    {id: "progressBarCt", url: R_ + "/images/scnThird/progressBarCt.png"},
    {id: "progressBarBg", url: R_ + "/images/scnThird/progressBarBg.png"},

    {id: "scnThirdTitle", url: R_ + "/images/scnThird/title.png"}


  ];

  function createLoadingScene(director, loadingImages) {
    var scene = director.createScene();
    var bg = Util.createImageActorInBound(director, "loadingScreen",
      0, 0, director.width, director.height);
    scene.addChild(bg);

    // check loading
    var loadingPercent;
    var loadingText = Util.createText("Loading ... " + loadingPercent + "%");
    scene.addChild(loadingText);

    function incrementLoadingPercent(percent) {
      loadingPercent += percent;
      loadingText.setText("Loading ... " + Math.floor(loadingPercent) + "%");
      loadingText.centerAt(W_ / 2, H_ / 2 - 100 * sf);
    }

    loadingPercent = 0;
    incrementLoadingPercent(0);

    new CAAT.Module.Preloader.ImagePreloader().loadImages(
      loadingImages,
      function on_load(counter, images) {
        var sceneMgr;
        incrementLoadingPercent(1 / images.length * 100);
        if (counter === images.length) {
          // always first do cache
          director.setImagesCache(images);
          sceneMgr = new SceneMgr(director);
          createScenes(sceneMgr);
        }
      },
      function error(err, index) {
        alert(index + " has error");
      }
    );
  }

  // main initialization - this creates the Director
  var canvasContainer = document.createElement(navigator.isCocoonJS ? "screencanvas" : "canvas");
  document.body.appendChild(canvasContainer);
  var director;
  if (DEBUG_.grid) {
    director = new CAAT.Director().initialize(1000, 500, canvasContainer);
  } else {
    director = new CAAT.Director();
    if (Util.isMobileDevice(director)) {
      director.initialize(window.innerWidth, window.innerHeight, canvasContainer);
    } else {
      // only for web browser
      director.initialize(window.innerWidth - 20, window.innerHeight - 40, canvasContainer);
    }
  }

  //load button sound
  director.addAudio("btnSound", R_ + "/music/btnSound" + MF_);
  window['W_'] = director.width;
  window['H_'] = director.height;
  window['sf'] = calculateSF(W_, H_);
  window['RBS_'] = 115 * sf;
  if (W_ / H_ < 1.6) {
    window['RBS_'] = 130 * sf;
  }

  window['HORIZONTAL'] = 0;
  window['VERTICAL'] = 1;
  window['INC'] = 1;
  window['DEC'] = 0;
  window["FONT_COLOR"] = "#996633";
  window["GEM_UNIT"] = "carrots";
  window["AD_INFO"] = { status: "hide"};

  // init ads
  Util.initAd();
  Util.showAd();

  var ctx = canvasContainer.getContext('2d');
  new CAAT.Module.Preloader.ImagePreloader().loadImages(
    [
      {id: "loadingScreen", url: R_ + "/images/general.png"}
    ],
    function on_load(counter, images) {
      if (counter === images.length) {
        director.setImagesCache(images);
        createLoadingScene(director, loadingImages);
      }
    }
  );

  // begin main CAAT loop, with timing parameter
  CAAT.loop(60);

  function calculateSF(w, h) {
    var sf_1 = w / 1000;
    var sf_2 = h / 500;
    return Math.min(sf_1, sf_2)
  }

})();
