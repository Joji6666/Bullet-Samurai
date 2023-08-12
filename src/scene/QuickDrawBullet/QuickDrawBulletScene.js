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
    // Add Map image
    new AddMap(this);

    // platforms setting
    const platforms = this.physics.add.staticGroup();
    this.data.set("platforms", platforms);

    //player

    // Create Map
    new CreateMap(platforms);

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

    new Physics(this, player);
  }
  update() {
    const shooter = this.children.getByName("shooter");

    if (shooter) {
      const minInterval = 5000;
      const maxInterval = 15000;
      const bulletInterval = Phaser.Math.Between(minInterval, maxInterval);

      if (
        !shooter.lastShotTime ||
        this.time.now - shooter.lastShotTime >= bulletInterval
      ) {
        autoBulletFire(shooter, this, bulletInterval);
        shooter.lastShotTime = this.time.now; // 마지막 발사 시간 업데이트
      }
    }
  }
}
