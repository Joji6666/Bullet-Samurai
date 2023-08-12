export function bulletFire(shooter, scene) {
  const prevBulletParticle = scene.data.get("bulletParticle");
  if (prevBulletParticle) {
    prevBulletParticle.destroy();
  }

  // 새로운 bulletParticle 생성
  const bulletParticle = scene.data
    .get("bullets")
    .create(shooter.x - 34, shooter.y - 17, "bullet")
    .setScale(0.4);

  bulletParticle.scene = scene;

  scene.data.set("bulletParticle", bulletParticle);
  bulletParticle.setVelocityX(-4000);
  bulletParticle.setSize(
    bulletParticle.width * 0.2,
    bulletParticle.height * 0.3
  );
}
