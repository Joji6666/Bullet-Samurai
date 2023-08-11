export function bulletFire(shooter, scene) {
  const bulletParticle = scene.data
    .get("bullets")
    .create(shooter.x - 34, shooter.y - 17, "bullet")
    .setScale(0.7);

  scene.data.set("bulletParticle", bulletParticle);
  bulletParticle.setVelocityX(-2000);
}
