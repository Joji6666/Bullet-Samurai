export function bulletFire(
  shooter: any,
  scene: any,
  bulletSpeed: { value: number }
) {
  const isBulletTime = scene.isBulletTime;
  const score = scene.data.get("score");
  const bulletStuck = Phaser.Math.Between(1, 10);

  if (score > 700 && bulletStuck === 5) {
    const stuckText = scene.add.text(shooter.x, shooter.y - 100, "stuck", {
      fontSize: "16px",
      color: "black",
    });
    shooter.anims.play("shooter_reload", true);
    shooter.on("animationcomplete-shooter_reload", () => {
      shooter.anims.play("shooter_idle", true);
      scene.data.set("shooterMoveState", "idle");
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
