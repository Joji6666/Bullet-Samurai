import Phaser from "phaser";

let selectedMenu = 0;
export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("gameOverScene");
  }

  init(data: any) {
    const score = data.score;
    this.data.set("score", score);
    selectedMenu = 0;
  }

  preload() {
    this.load.spritesheet("samurai_death", "asset/char/samurai/death.png", {
      frameWidth: 200,
      frameHeight: 200,
    });
  }

  create() {
    this.anims.create({
      key: "samurai_death",

      frames: this.anims.generateFrameNumbers(`samurai_death`, {
        start: 0,
        end: 5,
      }),

      frameRate: 10,

      repeat: 0,
    });
    const screenWidth = this.cameras.main.width;
    const screenHeight = this.cameras.main.height;
    const score = this.data.get("score");
    const text = this.add.text(screenWidth / 2, 100, "GAME OVER", {
      fontSize: "64px",
      align: "center", // 텍스트를 가운데 정렬
      fontFamily: "InfiniteFont",
      color: "red",
    });

    const text2 = this.add.text(screenWidth / 2, 200, `Your Score:${score}`, {
      fontSize: "32px",
      align: "center", // 텍스트를 가운데 정렬
      fontFamily: "InfiniteFont",
      color: "cyan",
    });
    const text3 = this.add.text(
      screenWidth / 2,
      650,
      "Press Space to Continue",
      {
        fontSize: "16px",
        align: "center", // 텍스트를 가운데 정렬
        fontFamily: "InfiniteFont",
        color: "cyan",
      }
    );

    const text4 = this.add.text(
      screenWidth / 2,
      600,
      "Press the R key to enter the rank",
      {
        fontSize: "16px",
        align: "center", // 텍스트를 가운데 정렬
        fontFamily: "InfiniteFont",
        color: "cyan",
      }
    );

    // 텍스트의 앵커를 0.5로 설정하여 중앙을 기준으로 배치
    text.setOrigin(0.5);
    text2.setOrigin(0.5);
    text3.setOrigin(0.5);
    text4.setOrigin(0.5);
    const player = this.physics.add
      .sprite(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        `samurai_death`
      )
      .setName("player")
      .setScale(2);
    player.anims.play("samurai_death", true);

    this.input.keyboard.once("keydown-SPACE", () => {
      selectedMenu = 0;
      this.cameras.main.fadeOut(1000, 0, 0, 0);
    });

    this.input.keyboard.once("keydown-R", () => {
      selectedMenu = 1;
      this.cameras.main.fadeOut(1000, 0, 0, 0);
    });

    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      () => {
        this.time.delayedCall(1000, () => {
          if (selectedMenu === 0) {
            this.scene.start("gameStartScene", {
              fadeIn: true,
            });
          }

          if (selectedMenu === 1) {
            this.scene.start("enterRankScene", {
              fadeIn: true,
              score: this.data.get("score"),
            });
          }
        });
      }
    );
  }
}
