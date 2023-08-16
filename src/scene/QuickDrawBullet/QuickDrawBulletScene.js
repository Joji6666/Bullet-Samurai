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

    const player = this.physics.add
      .sprite(100, 640, `samurai_idle`)
      .setName("player")
      .setScale(2);
    this.data.set("player", player);

    const shooter = this.physics.add
      .sprite(1100, 655, `shooter_idle`)
      .setName("shooter")
      .setScale(2);
    this.data.set("shooter", shooter);
    shooter.setFlipX(true);
    player.moveState = "idle";
    shooter.moveState = "idle";

    player.body.setSize(player.width * 0.2, player.height * 0.3);
    new SamuraiAnimations(this, player);
    new ShooterAnimations(this, shooter);

    new Physics(this, player, bulletSpeed);

    this.isBulletTime = false;
    this.isBulletDestroy = false;
    this.attackAround = 0.1;

    this.input.keyboard.on("keydown-Z", () => {
      if (this.bulletTimeProgressBarWidth > 0) {
        this.isBulletTime = !this.isBulletTime;
      }

      if (this.isBulletTime) {
        const bullet = this.data.get("bulletParticle");
        if (bullet && bullet.body?.velocity?.x) {
          bullet.setVelocityX(bulletSpeed.value * 0.1);
        }
      } else {
        const bullet = this.data.get("bulletParticle");
        if (bullet && bullet.body?.velocity?.x) {
          bullet.setVelocityX(bulletSpeed.value);
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
      this.attackAnimation.frameRate = 5;
      player.setTint(0x808080);
      shooter.setTint(0x808080);
      background.setTint(0x808080);
      ground.setTint(0x808080);

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
      timeScale: this.isBulletTime ? 0.1 : 1,
    });

    if (!this.isBulletTime) {
      this.attackAnimation.frameRate = 60;
      player.clearTint();
      shooter.clearTint();
      background.clearTint();
      ground.clearTint();
    }

    if (player.moveState === "attack") {
      console.log("atttaaacckkk");
      player.body.setSize(
        player.width * this.attackAround,
        player.height * 0.4
      );
      this.attackAround = this.isBulletTime
        ? this.attackAround + 0.0121
        : this.attackAround + 0.15;
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
