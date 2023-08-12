export function hitBullet(scene, player) {
  const bullet = scene.data.get("bulletParticle");

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

    player.on("animationcomplete-samurai_death", () => {
      scene.scene.stop("quickDrawBulletScene"); // 현재 게임 씬 중단
      scene.scene.start("gameOverScene"); // 게임 오버 씬 시작
    });
  }
}
