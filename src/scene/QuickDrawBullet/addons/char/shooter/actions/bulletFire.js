export function bulletFire(shooter, scene, bulletSpeed) {
  const isBulletTime = scene.isBulletTime;
  const score = scene.data.get("score");
  const bulletStuck = Phaser.Math.Between(1, 10);
  console.log(score, "score", bulletStuck, "bulletStuck");
  if (score > 100 && bulletStuck === 5) {
    const stuckText = scene.add.text(shooter.x, shooter.y - 100, "stuck", {
      fontSize: "16px",
      color: "black",
    });
    shooter.anims.play("shooter_reload", true);
    shooter.on("animationcomplete-shooter_reload", () => {
      shooter.anims.play("shooter_idle", true);
      shooter.moveState = "idle";
      shooter.removeAllListeners();
    });

    setTimeout(() => {
      stuckText.destroy();
    }, 1000);
    return;
  }

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
