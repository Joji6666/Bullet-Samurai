export function wickHitBullet(scene: Phaser.Scene) {
  const wick = scene.data.get("wick");
  const wickLife = scene.data.get("wickLife");
  const bullet = scene.data.get("bulletParticle");

  bullet.destroy();
  wick.setTint(0xff0000);
  setTimeout(() => {
    wick.clearTint();
  }, 600);
  scene.data.set("wickLife", wickLife - 1);
  scene.data.set("isBulletDestroy", true);
  scene.data.set("successHit", false);
  if (wickLife === 0) {
    wick.anims.play("wick_die", true);
    scene.data.set("isWickTime", false);
    scene.data.set("successHit", false);
  }
}
