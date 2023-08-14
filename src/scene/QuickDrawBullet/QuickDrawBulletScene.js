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
let isBulletTime = false;
const bulletSpeed = { value: -3000 };
let nextBulletTime = 0;
const minInterval = 2000;
const maxInterval = 9000;
let isCoolDown = false;
let bulletTimeGauge = 100;

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

    const player = this.physics.add
      .sprite(100, 700, `samurai_idle`)
      .setName("player")
      .setScale(2);

    const shooter = this.physics.add
      .sprite(1100, 715, `shooter_idle`)
      .setName("shooter")
      .setScale(2);

    shooter.setFlipX(true);
    player.moveState = "idle";
    shooter.moveState = "idle";

    player.body.setSize(player.width * 0.2, player.height * 0.3);
    new SamuraiAnimations(this, player);
    new ShooterAnimations(this, shooter);

    new Physics(this, player, bulletSpeed);

    const background = this.data.get("background");
    const ground = this.data.get("ground");

    this.input.keyboard.on("keydown-Z", () => {
      isBulletTime = !isBulletTime;
      this.isBulletTime = isBulletTime;
      if (isBulletTime) {
        player.setTint(0x808080);
        shooter.setTint(0x808080);
        background.setTint(0x808080);
        ground.setTint(0x808080);
        this.tweens.add({
          targets: player.anims,
          timeScale: 0.1,
        });

        this.tweens.add({
          targets: shooter.anims,
          timeScale: 0.1,
        });
      } else {
        const bullet = this.data.get("bulletParticle");
        player.clearTint();
        shooter.clearTint();
        background.clearTint();
        ground.clearTint();
        if (bullet && bullet.body?.velocity?.x) {
          bullet.setVelocityX(bulletSpeed.value);
        }
        this.tweens.add({
          targets: player.anims,
          timeScale: 1,
        });

        this.tweens.add({
          targets: shooter.anims,
          timeScale: 1,
        });
      }
    });
  }

  update() {
    const shooter = this.children.getByName("shooter");
    const bulletInterval = Phaser.Math.Between(minInterval, maxInterval);
    if (shooter) {
      const currentTime = this.time.now;

      if (currentTime > nextBulletTime && shooter.moveState === "idle") {
        nextBulletTime = currentTime + bulletInterval;

        autoBulletFire(shooter, this, bulletSpeed);
      }
    }
  }
}
