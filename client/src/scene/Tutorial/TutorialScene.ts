export default class TutorialScene extends Phaser.Scene {
  constructor() {
    super("tutorialScene");
  }

  preload() {
    this.load.image("space", "asset/icon/space.png");
    this.load.image("z_key", "asset/icon/zkey.png");
    this.load.image("attack", "asset/text/attack.png");
    this.load.image("eye_of_ronin_text", "asset/text/eye_of_ronin.png");

    this.load.image("back_buildings", "asset/background/back_buildings.png");
    this.load.image("far_buildings", "asset/background/far_buildings.png");
    this.load.image("how_to_play", "asset/text/howToPlay.png");
  }

  create() {
    const screenWidth = this.cameras.main.width;
    this.add.image(screenWidth / 2, 400, "far_buildings").setScale(5);
    this.add.image(screenWidth / 2, 400, "back_buildings").setScale(5);
    const space = this.add.image(100, 300, "space").setScale(2);
    const zKey = this.add.image(100, 400, "z_key").setScale(2);
    const howToPlay = this.add
      .image(screenWidth / 2, 100, "how_to_play")
      .setScale(1);
    const attack = this.add
      .image(space.x + 150, space.y, "attack")
      .setScale(0.5);
    const eyeOfRonin = this.add
      .image(zKey.x + 150, zKey.y, "eye_of_ronin_text")
      .setScale(0.5);

    const text = this.add.text(
      screenWidth / 2,
      600,
      "Press Space to Continue",
      {
        fontSize: "32px",
        align: "center", // 텍스트를 가운데 정렬
      }
    );

    text.setOrigin(0.5);

    this.input.keyboard.once("keydown-SPACE", () => {
      this.cameras.main.fadeOut(1000, 0, 0, 0);
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
