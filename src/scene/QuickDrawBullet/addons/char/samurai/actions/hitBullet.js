export function hitBullet(scene, player, bulletSpeed) {
  const bullet = scene.data.get("bulletParticle");
  const shooter = scene.children.getByName("shooter");
  if (player.moveState === "attack") {
    const slashHit = scene.physics.add
      .sprite(bullet.x, bullet.y, `slash_hit`)
      .setName("slash")
      .setScale(2);

    slashHit.anims.play("slash_hit", true);

    bullet.destroy();
    slashHit.on("animationcomplete-slash_hit", () => {
      slashHit.destroy();
    });
  } else {
    bullet.destroy();
    player.anims.play("samurai_death", true);
    player.moveState = "death";
    scene.isCoolDown = false;
    bulletSpeed.value = -3000;
    scene.tweens.add({
      targets: player.anims,
      timeScale: 1,
    });
    scene.tweens.add({
      targets: shooter.anims,
      timeScale: 1,
    });

    player.on("animationcomplete-samurai_death", () => {
      scene.scene.stop("quickDrawBulletScene"); // 현재 게임 씬 중단
      scene.scene.start("gameOverScene"); // 게임 오버 씬 시작
    });
  }
}
