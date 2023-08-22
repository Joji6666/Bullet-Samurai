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
    this.load.image("katana", "asset/icon/katana.png");
    this.load.image("back_buildings", "asset/background/back_buildings.png");
    this.load.image("far_buildings", "asset/background/far_buildings.png");

    this.load.spritesheet("slash", "asset/effect/slash_hit.png", {
      frameWidth: 43,
      frameHeight: 52,
    });
    this.load.audio("slash_sound", "asset/sound/slash.wav");
    this.load.audio("yoo", "asset/sound/yoo.mp3");
    this.load.audio("main_bgm", "asset/sound/main_bgm.mp3");
  }

  create() {
    const bgm: any = this.sound.add("main_bgm");
    bgm.setVolume(0.2);

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
    this.add.image(screenWidth / 2, 400, "far_buildings").setScale(5);
    this.add.image(screenWidth / 2, 400, "back_buildings").setScale(5);

    const title = this.add.image(screenWidth / 2, 650, "title").setScale(1.5);

    const gameStart = this.add.text(screenWidth / 2, 500, "", {
      fontSize: "32px",
      color: "cyan",
      fontFamily: "InfiniteFont",
    });
    const ranking = this.add.text(screenWidth / 2, 650, "", {
      fontSize: "32px",
      color: "cyan",
      fontFamily: "InfiniteFont",
    });
    const howToPlay = this.add.text(screenWidth / 2, 570, "", {
      fontSize: "32px",
      color: "cyan",
      fontFamily: "InfiniteFont",
    });

    setTimeout(() => {
      gameStart.setText("GAME START");
      howToPlay.setText("HOW TO PLAY");
      ranking.setText("RANKING");
    }, 100);

    gameStart.setOrigin(0.5);
    ranking.setOrigin(0.5);
    howToPlay.setOrigin(0.5);

    const katana = this.add
      .image(gameStart.x - 180, gameStart.y, "katana")
      .setScale(0.75);
    katana.rotation = 300;

    this.input.keyboard.once("keydown-SPACE", () => {
      if (selectedMenu === 0) {
        const slashSound = this.sound.add("slash_sound");

        slashSound.play();
        const slash = this.physics.add
          .sprite(title.x, title.y - 550, `slash`)
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
          const yooSound = this.sound.add("yoo");

          bgm.play();
          yooSound.play();
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
            this.scene.start("quickDrawBulletScene", {
              fadeIn: true,
              mainBgm: bgm,
            });
          }

          if (selectedMenu === 1) {
            this.scene.start("tutorialScene", { fadeIn: true });
          }

          if (selectedMenu === 2) {
            this.scene.start("rankingScene", { fadeIn: true });
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

      if (selectedMenu === 2) {
        selectedMenu = 1;
        katana.x = howToPlay.x - 190;
        katana.y = howToPlay.y;
      }
    });

    this.input.keyboard.on("keydown-DOWN", () => {
      if (selectedMenu === 1) {
        selectedMenu = 2;
        katana.x = ranking.x - 190;
        katana.y = ranking.y;
      }
      if (selectedMenu === 0) {
        selectedMenu = 1;
        katana.x = howToPlay.x - 190;
        katana.y = howToPlay.y;
      }
    });
  }
}
