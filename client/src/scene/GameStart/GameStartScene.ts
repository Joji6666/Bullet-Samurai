import Phaser from "phaser";

let selectedMenu = 0;

export default class GameStartScene extends Phaser.Scene {
  constructor() {
    super("gameStartScene");
  }

  init() {
    selectedMenu = 0;
  }

  preload() {
    this.load.spritesheet("samurai_fall", "asset/char/samurai/fall.png", {
      frameWidth: 200,
      frameHeight: 200,
    });
    this.load.image("title", "asset/text/title.png");
    this.load.image("title_slash", "asset/text/title_slash.png");
    this.load.image("game_start", "asset/text/gameStart.png");
    this.load.image("how_to_play", "asset/text/howToPlay.png");
    this.load.image("katana", "asset/icon/katana.png");
    this.load.image("Hills_01", "asset/background/Hills_01.png");
    this.load.image("Hills_02", "asset/background/Hills_02.png");

    this.load.spritesheet("slash", "asset/effect/slash_hit.png", {
      frameWidth: 43,
      frameHeight: 52,
    });
  }

  create() {
    this.anims.create({
      key: "samurai_fall",

      frames: this.anims.generateFrameNumbers(`samurai_fall`, {
        start: 0,
        end: 1,
      }),

      frameRate: 30,

      repeat: -1,
    });

    const screenWidth = this.cameras.main.width;

    this.anims.create({
      key: "slash",

      frames: this.anims.generateFrameNumbers(`slash`, {
        start: 0,
        end: 3,
      }),

      frameRate: 60,

      repeat: 0,
    });

    this.add.image(screenWidth / 2, 350, "Hills_01").setScale(3);
    this.add.image(screenWidth / 2, 350, "Hills_02").setScale(3);

    const title = this.add.image(screenWidth / 2, 650, "title").setScale(1.5);

    const gameStart = this.add
      .image(screenWidth / 2 + 20, 500, "game_start")
      .setScale(1);
    const howToPlay = this.add
      .image(screenWidth / 2 + 25, 570, "how_to_play")
      .setScale(1);
    const katana = this.add
      .image(gameStart.x - 180, gameStart.y, "katana")
      .setScale(0.75);
    katana.rotation = 300;

    this.input.keyboard.once("keydown-SPACE", () => {
      if (selectedMenu === 0) {
        const slash = this.physics.add
          .sprite(title.x, title.y, `slash`)
          .setName("slash")
          .setScale(12);
        slash.rotation = Phaser.Math.DegToRad(45);

        slash.anims.play("slash", true);
        this.cameras.main.setScroll(
          this.cameras.main.scrollX + 10,
          this.cameras.main.scrollY + -10
        );
        title.destroy();
        const titleSlash = this.add
          .image(screenWidth / 2, 650, "title_slash")
          .setScale(1.5);
        setTimeout(() => {
          this.cameras.main.setScroll(
            this.cameras.main.scrollX - 10,
            this.cameras.main.scrollY + 10
          );

          slash.destroy();
        }, 100);

        setTimeout(() => {
          const samurai = this.physics.add
            .sprite(100, -100, `samurai_fall`)
            .setName("samurai")
            .setScale(2);

          samurai.anims.play("samurai_fall", true);

          samurai.setVelocityX(50);
          samurai.setVelocityY(650);
        }, 500);

        setTimeout(() => {
          this.cameras.main.fadeOut(1000, 0, 0, 0);
        }, 2000);
      } else {
        setTimeout(() => {
          this.cameras.main.fadeOut(1000, 0, 0, 0);
        }, 500);
      }
    });

    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      () => {
        this.time.delayedCall(1000, () => {
          if (selectedMenu === 0) {
            this.scene.start("quickDrawBulletScene", { fadeIn: true });
          }

          if (selectedMenu === 1) {
            this.scene.start("tutorialScene", { fadeIn: true });
          }
        });
      }
    );

    this.input.keyboard.on("keydown-UP", () => {
      if (selectedMenu === 1) {
        selectedMenu = 0;
        katana.x = gameStart.x - 180;
        katana.y = gameStart.y;
      }
    });

    this.input.keyboard.on("keydown-DOWN", () => {
      if (selectedMenu === 0) {
        selectedMenu = 1;
        katana.x = howToPlay.x - 190;
        katana.y = howToPlay.y;
      }
    });
  }
}
