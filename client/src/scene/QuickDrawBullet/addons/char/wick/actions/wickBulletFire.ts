export function wickBulletFire(
  scene: Phaser.Scene,
  bulletSpeed: { value: number }
) {
  const wick = scene.data.get("wick");
  const wickCouchSwitch = Phaser.Math.Between(1, 3);
  wick.anims.play("wick_shoot", true);
  scene.data.set("wickMoveState", "gunFire");
  scene.data.set("isBulletDestroy", false);
  const bulletParticle = scene.data
    .get("bullets")
    .create(wick.x - 34, wick.y - 17, "bullet")
    .setScale(0.4);

  const gunSound = scene.data.get("gunSound");
  gunSound.play();
  bulletParticle.scene = scene;
  bulletSpeed.value = bulletSpeed.value - 25;

  scene.data.set("bulletParticle", bulletParticle);

  bulletParticle.setVelocityX(bulletSpeed.value);

  bulletParticle.setSize(
    bulletParticle.width * 0.2,
    bulletParticle.height * 0.3
  );
  wick.body.setSize(wick.width * 0.2, wick.height * 0.3);
  wick.on("animationcomplete-wick_shoot", () => {
    if (wickCouchSwitch === 1) {
      wick.anims.play("wick_couch", true);
      wick.body.setSize(wick.width * 0.2, wick.height * 0.1);
      setTimeout(() => {
        scene.data.set("wickMoveState", "idle");
        wick.removeAllListeners();
      }, 1000);
    } else {
      wick.anims.play("wick_idle", true);
      scene.data.set("wickMoveState", "idle");
      wick.removeAllListeners();
    }
  });
}
