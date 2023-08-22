import { playRendomBgm } from "../../../../playRendomBgm";

export function wickHitBullet(scene: Phaser.Scene) {
  const wick = scene.data.get("wick");
  const wickLife = scene.data.get("wickLife");
  const bullet = scene.data.get("bulletParticle");
  const playingBgm = scene.data.get("playingBgm");
  bullet.destroy();
  wick.setTint(0xff0000);
  setTimeout(() => {
    wick.clearTint();
  }, 600);
  scene.data.set("wickLife", wickLife - 1);
  scene.data.set("isBulletDestroy", true);
  scene.data.set("successHit", false);

  const newWickLife = scene.data.get("wickLife");

  const prevWickLifeBar = scene.data.get("wickLifeBar");
  const newWickLifeBar = scene.add
    .image(prevWickLifeBar.x, prevWickLifeBar.y, `wick_life_${newWickLife}`)
    .setScale(2.5, 2);
  prevWickLifeBar.destroy();
  scene.data.set("wickLifeBar", newWickLifeBar);

  if (newWickLife === 0) {
    wick.anims.play("wick_die", true);
    scene.data.set("isWickTime", false);
    scene.data.set("successHit", false);
    wick.on("animationcomplete-wick_die", () => {
      setTimeout(() => {
        scene.data.set("isWickTime", false);
        playingBgm.stop();
        playRendomBgm(scene);
        const shooter = scene.physics.add
          .sprite(1100, 655, `shooter_idle`)
          .setName("shooter")
          .setScale(2);
        scene.data.set("shooter", shooter);
        shooter.setFlipX(true);
        scene.data.set("shooterMoveState", "idle");
        wick.destroy();
        scene.data.set("isWickDead", true);
        newWickLifeBar.destroy();
      }, 1000);
    });
  }
}
