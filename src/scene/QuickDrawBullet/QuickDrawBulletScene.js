import Phaser from "phaser";
import PreloadMap from "./addons/map/PreloadMap";
import CreateMap from "./addons/map/CreateMap";
import AddMap from "./addons/map/AddMap";
import PreloadSamuraiSprite from "./addons/char/samurai/PreloadSamuraiSprite";
import SamuraiAnimations from "./addons/char/samurai/SamuraiAnimations";
import PreloadShooterSprite from "./addons/char/shooter/PreloadShooterSprite";
import ShooterAnimations from "./addons/char/shooter/ShooterAnimations";

import { autoBulletFire } from "./addons/char/shooter/actions/autoBulletFire";

import Physics from "./Physics";
import BulletTimeProgressBar from "./addons/BulletTimeProgressBar";

const bulletSpeed = { value: -3000 };
let nextBulletTime = 0;
const minInterval = 2000;
const maxInterval = 9000;
let isCoolDown = false;

export default class QuickDrawBulletScene extends Phaser.Scene {
  constructor() {
    super("quickDrawBulletScene");
  }

  preload() {
    // Load map
    new PreloadMap(this);
    new PreloadSamuraiSprite(this);
    new PreloadShooterSprite(this);
  }

  create() {
    this.isCoolDown = isCoolDown;
    this.isBulletTime = false;
    this.isBulletDestroy = false;
    this.attackAround = 0.1;
    // Add Map image
    new AddMap(this);

    // platforms setting
    const platforms = this.physics.add.staticGroup();
    this.data.set("platforms", platforms);

    //player

    // Create Map
    new CreateMap(platforms, this);

    this.data.set("score", 0);
    this.add
      .text(50, 100, "score: 0", { fontSize: "32px", color: "black" })
      .setName("scoreText");

    // player init
    const player = this.physics.add
      .sprite(100, 640, `samurai_idle`)
      .setName("player")
      .setScale(2);
    this.data.set("player", player);
    player.moveState = "idle";
    player.body.setSize(player.width * 0.2, player.height * 0.3);
    // shooter init
    const shooter = this.physics.add
      .sprite(1100, 655, `shooter_idle`)
      .setName("shooter")
      .setScale(2);
    this.data.set("shooter", shooter);
    shooter.setFlipX(true);

    shooter.moveState = "idle";

    new SamuraiAnimations(this, player);
    new ShooterAnimations(this, shooter);

    new Physics(this, player, bulletSpeed);

    this.input.keyboard.on("keydown-Z", () => {
      if (this.bulletTimeProgressBarWidth > 0) {
        this.isBulletTime = !this.isBulletTime;
      }

      if (this.isBulletTime) {
        const eyeOfRonin = this.physics.add
          .sprite(player.x, player.y, `eye_of_ronin`)
          .setName("eyeOfRonin")
          .setScale(2);

        eyeOfRonin.anims.play("eye_of_ronin", true);
        this.data.set("eyeOfRonin", eyeOfRonin);
      }

      if (!this.isBulletTime) {
        const eyeOfRonin = this.data.get("eyeOfRonin");

        if (eyeOfRonin) {
          eyeOfRonin.destroy();
        }
      }
    });

    new BulletTimeProgressBar(this);
  }

  update() {
    const shooter = this.data.get("shooter");
    const bulletInterval = Phaser.Math.Between(minInterval, maxInterval);
    const player = this.data.get("player");
    const background = this.data.get("background");
    const ground = this.data.get("ground");
    const bulletTimeProgressBar = this.data.get("bulletTimeProgressBar");
    const isBulletTime = this.isBulletTime;
    const progressBarWidth = 100;
    const progressBarHeight = 10;

    if (isBulletTime) {
      const bullet = this.data.get("bulletParticle");
      if (bullet && bullet.body?.velocity?.x) {
        bullet.setVelocityX(bulletSpeed.value * 0.1);
      }
      this.attackAnimation.frameRate = 5;

      player.setTint(0x802080);
      shooter.setTint(0x404040);
      background.setTint(0x404040);
      ground.setTint(0x404040);

      this.bulletTimeProgressBarWidth = this.bulletTimeProgressBarWidth -= 0.25;
      bulletTimeProgressBar.clear();
      bulletTimeProgressBar.fillRect(
        -progressBarWidth / 2,
        -progressBarHeight - 5,
        this.bulletTimeProgressBarWidth,
        progressBarHeight
      );
      if (this.bulletTimeProgressBarWidth === 0) {
        this.isBulletTime = false;
      }
    }

    this.tweens.add({
      targets: shooter.anims,
      timeScale: isBulletTime ? 0.1 : 1,
    });

    if (!isBulletTime) {
      const bullet = this.data.get("bulletParticle");
      if (bullet && bullet.body?.velocity?.x) {
        bullet.setVelocityX(bulletSpeed.value);
      }
      this.attackAnimation.frameRate = 60;

      player.clearTint();
      shooter.clearTint();
      background.clearTint();
      ground.clearTint();
    }

    if (player.moveState === "attack") {
      player.body.setSize(
        player.width * this.attackAround,
        player.height * 0.4
      );

      if (isBulletTime && player.body.offset.x < 57) {
        player.isSwordOut = true;
      }

      if (player.body.offset.x < 73 && !isBulletTime) {
        player.isSwordOut = true;
      }

      if (player.body.offset.x > 75) {
        player.isSwordOut = false;
      }

      this.attackAround = this.isBulletTime
        ? this.attackAround + 0.0121
        : this.attackAround + 0.162;
    }

    if (shooter) {
      const currentTime = this.time.now;

      if (currentTime > nextBulletTime && shooter.moveState === "idle") {
        nextBulletTime = currentTime + bulletInterval;

        autoBulletFire(shooter, this, bulletSpeed);
      }
    }
  }
}
