export function bulletFire(shooter, scene, bulletSpeed) {
  const isBulletTime = scene.isBulletTime;

  const bulletParticle = scene.data
    .get("bullets")
    .create(shooter.x - 34, shooter.y - 17, "bullet")
    .setScale(0.4);

  bulletParticle.scene = scene;
  bulletSpeed.value = bulletSpeed.value - 100;
  scene.data.set("bulletParticle", bulletParticle);

  bulletParticle.setVelocityX(
    isBulletTime ? bulletSpeed.value * 0.1 : bulletSpeed.value
  );
  bulletParticle.setSize(
    bulletParticle.width * 0.2,
    bulletParticle.height * 0.3
  );
}
