let tutorialCount = 1;

export default class TutorialScene extends Phaser.Scene {
  constructor() {
    super("tutorialScene");
  }

  preload() {
    this.load.image("tuto_1", "asset/tutorial/001.png");
    this.load.image("tuto_2", "asset/tutorial/002.png");
    this.load.image("tuto_3", "asset/tutorial/003.png");
    this.load.image("tuto_4", "asset/tutorial/004.png");
    this.load.image("tuto_5", "asset/tutorial/005.png");
    this.load.image("tuto_6", "asset/tutorial/006.png");
    this.load.image("tuto_7", "asset/tutorial/007.png");
    this.load.image("tuto_8", "asset/tutorial/008.png");
    this.load.image("tuto_9", "asset/tutorial/009.png");
    this.load.image("tuto_10", "asset/tutorial/010.png");
    this.load.image("tuto_11", "asset/tutorial/011.png");
    this.load.image("tuto_12", "asset/tutorial/012.png");
    this.load.image("tuto_13", "asset/tutorial/013.png");
    this.load.image("arrow", "asset/tutorial/arrow.png");
    this.load.image("background_1", "asset/tutorial/1.png");
    this.load.image("background_2", "asset/tutorial/2.png");
    this.load.image("background_3", "asset/tutorial/3.png");
    this.load.image("background_4", "asset/tutorial/4.png");
    this.load.image("background_5", "asset/tutorial/5.png");
    this.load.image("background_6", "asset/tutorial/6.png");
    this.load.image("background_7", "asset/tutorial/7.png");
    this.load.image("background_8", "asset/tutorial/8.png");
  }

  init() {
    tutorialCount = 1;
  }

  create() {
    const screenWidth = this.cameras.main.width;
    const screenHeight = this.cameras.main.height;
    this.add.image(screenWidth / 2, 350, "background_1").setScale(0.5);
    this.add.image(screenWidth / 2, 350, "background_2").setScale(0.5);
    this.add.image(screenWidth / 2, 350, "background_3").setScale(0.5);
    this.add.image(screenWidth / 2, 350, "background_4").setScale(0.5);
    this.add.image(screenWidth / 2, 350, "background_5").setScale(0.5);
    this.add.image(screenWidth / 2, 350, "background_6").setScale(0.5);
    this.add.image(screenWidth / 2, 350, "background_7").setScale(0.5);
    this.add.image(screenWidth / 2, 350, "background_8").setScale(0.5);
    this.add.image(100, screenHeight / 2, "arrow").setScale(0.25);
    this.add
      .image(1100, screenHeight / 2, "arrow")
      .setScale(0.25)
      .setFlipX(true);

    const text = this.add.text(screenWidth / 2, 50, "Press ESC to Main", {
      fontSize: "14px",
      align: "center", // 텍스트를 가운데 정렬
      fontFamily: "InfiniteFont", // CSS에서 정의한 font-family 이름 사용
      color: "red",
    });

    text.setOrigin(0.5);

    const prevTutorialImage = this.add
      .image(screenWidth / 2, 370, "tuto_1")
      .setScale(0.8);
    this.data.set("prevImage", prevTutorialImage);

    this.input.keyboard.once("keydown-ESC", () => {
      this.cameras.main.fadeOut(1000, 0, 0, 0);
    });
    this.input.keyboard.on("keydown-RIGHT", () => {
      if (tutorialCount < 12) {
        tutorialCount = tutorialCount + 1;
        const prevImage = this.data.get("prevImage");
        prevImage.destroy();
        const newImage = this.add
          .image(screenWidth / 2, 400, `tuto_${tutorialCount}`)
          .setScale(0.8);
        this.data.set("prevImage", newImage);
      }
    });

    this.input.keyboard.on("keydown-LEFT", () => {
      if (tutorialCount > 1) {
        tutorialCount = tutorialCount - 1;
        const prevImage = this.data.get("prevImage");
        prevImage.destroy();
        const newImage = this.add
          .image(screenWidth / 2, 400, `tuto_${tutorialCount}`)
          .setScale(0.8);
        this.data.set("prevImage", newImage);
      }
    });

    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      () => {
        this.time.delayedCall(1000, () => {
          this.input.keyboard.off;
          this.scene.start("gameStartScene", { fadeIn: true });
        });
      }
    );
  }
}
