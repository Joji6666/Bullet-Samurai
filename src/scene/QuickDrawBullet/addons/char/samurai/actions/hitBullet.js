export function hitBullet(scene, player, bulletSpeed) {
  const bullet = scene.data.get("bulletParticle");
  const shooter = scene.children.getByName("shooter");
  if (player.moveState === "attack" && player.isSwordOut) {
    const slashHit = scene.physics.add
      .sprite(bullet.x, bullet.y, `slash_hit`)
      .setName("slash")
      .setScale(2);

    slashHit.anims.play("slash_hit", true);
    scene.cameras.main.setScroll(
      scene.cameras.main.scrollX + 10,
      scene.cameras.main.scrollY + -10
    );

    setTimeout(() => {
      scene.cameras.main.setScroll(
        scene.cameras.main.scrollX - 10,
        scene.cameras.main.scrollY + 10
      );
    }, 100);
    bullet.destroy();
    slashHit.on("animationcomplete-slash_hit", () => {
      scene.data.set("score", scene.data.get("score") + Math.floor(bullet.x));

      scene.children
        .getByName("scoreText")
        .setText("Score: " + scene.data.get("score"));
      slashHit.destroy();
      scene.isBulletDestroy = true;
    });
  } else {
    bullet.destroy();
    scene.isBulletTime = false;
    const blood = scene.physics.add
      .sprite(player.x + 10, player.y - 10, `samurai_blood`)
      .setName("blood")
      .setScale(2);

    blood.anims.play("blooding", true);

    blood.on("animationcomplete-blooding", () => {
      blood.destroy();
    });
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
      scene.scene.start("gameOverScene", { score: scene.data.get("score") }); // 게임 오버 씬 시작
    });
  }
}
