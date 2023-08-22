import { wickHitBullet } from "./wickHitBullet";

export function wickTimeOn(scene: Phaser.Scene, shooter: any) {
  const playingBgm = scene.data.get("playingBgm");
  playingBgm.stop();
  const wickBgm = scene.sound.add("wick_bgm");
  wickBgm.play();
  scene.data.set("isWickTime", true);
  scene.data.set("playingBgm", wickBgm);
  shooter.anims.play("shooter_run", true);
  shooter.setVelocityX(200);
  const wickLifeBar = scene.add
    .image(1110, 157, "wick_life_4")
    .setScale(2.5, 2);
  scene.data.set("wickLifeBar", wickLifeBar);
  const bullet = scene.data.get("bullets");

  setTimeout(() => {
    shooter.destroy();
    scene.data.set("shooterMoveState", "run");
    const wick = scene.physics.add
      .sprite(1300, 640, `wick_idle`)
      .setName("wick")
      .setScale(3.5, 4);
    scene.data.set("wick", wick);
    scene.data.set("wickMoveState", "run");
    wick.anims.play("wick_run", true);
    scene.physics.add.overlap(
      bullet,
      wick,
      () => wickHitBullet(scene),
      undefined,
      scene
    );
    wick.setFlipX(true);
    wick.setVelocityX(-200);
    wick.body.setSize(wick.width * 0.2, wick.height * 0.3);
    setTimeout(() => {
      wick.setVelocityX(0);
      wick.anims.play("wick_idle", true);
      scene.data.set("wickMoveState", "idle");
      scene.data.set("isBulletTime", false);
    }, 900);
  }, 1000);
}
