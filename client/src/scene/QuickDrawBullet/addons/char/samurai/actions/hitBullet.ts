import { wickTimeOn } from "../../wick/actions/wickTimeOn";

export function hitBullet(
  scene: any,
  player: any,
  bulletSpeed: { value: number }
) {
  const wickTime = Phaser.Math.Between(1, 30);
  const bullet = scene.data.get("bulletParticle");
  const shooter = scene.children.getByName("shooter");
  const playerMoveState = scene.data.get("playerMoveState");
  const slashSound = scene.data.get("slashSound");
  const deathSound = scene.data.get("deathSound");
  const isWickTime = scene.data.get("isWickTime");
  const playerLife = scene.data.get("playerLife");
  const score = scene.data.get("score");
  const isWickDead = scene.data.get("isWickDead");

  if (playerMoveState === "attack" && player.isSwordOut) {
    const slashHit = scene.physics.add
      .sprite(bullet.x, bullet.y, `slash_hit`)
      .setName("slash")
      .setScale(2);
    slashSound.play();
    slashHit.anims.play("slash_hit", true);
    scene.cameras.main.setScroll(
      scene.cameras.main.scrollX + 5,
      scene.cameras.main.scrollY + -5
    );

    setTimeout(() => {
      scene.cameras.main.setScroll(
        scene.cameras.main.scrollX - 5,
        scene.cameras.main.scrollY + 5
      );
    }, 100);

    if (isWickTime) {
      const samuraiAttackAngle = scene.data.get("samuraiAttackAngle");
      scene.data.set("successHit", true);
      scene.data.set("attackAround", 0.1);

      player.body.setSize(player.width * 0.2, player.height * 0.3);
      if (samuraiAttackAngle === "up") {
        bullet.setVelocityY(-30);
      }
      if (samuraiAttackAngle === "down") {
        bullet.setVelocityY(30);
      }

      slashHit.on("animationcomplete-slash_hit", () => {
        slashHit.destroy();
        player.isSwordOut = false;
      });

      return;
    }

    bullet.destroy();

    slashHit.on("animationcomplete-slash_hit", () => {
      scene.data.set("score", scene.data.get("score") + Math.floor(bullet.x));

      scene.children
        .getByName("scoreText")
        .setText("Score: " + scene.data.get("score"));
      slashHit.destroy();

      if ((wickTime === 1 || score > 5000) && !isWickTime && !isWickDead) {
        wickTimeOn(scene, shooter);
        scene.data.set("isBulletTime", false);
      }
    });
  }

  if (playerMoveState !== "attack" || !player.isSwordOut) {
    console.log(player.width * 0.2, player.height * 0.3);
    bullet.destroy();
    console.log("work");
    scene.data.set("isPlayerHitBullet", true);
    player.anims.play("samurai_hit", true);
    player.isSwordOut = false;
    scene.data.set("attackAround", 0.1);
    player.body.setSize(40, 60);

    scene.data.set("isBulletDestroy", true);
    scene.data.set("successHit", false);
    scene.data.set("playerLife", playerLife - 1);

    const newPlayerLife = scene.data.get("playerLife");

    const prevLifeBar = scene.data.get("samuraiLifeBar");
    const newLifeBar = scene.add
      .image(prevLifeBar.x, prevLifeBar.y, `samurai_life_${newPlayerLife}`)
      .setScale(2.5, 2);
    prevLifeBar.destroy();
    scene.data.set("samuraiLifeBar", newLifeBar);

    player.on("animationcomplete-samurai_hit", () => {
      player.anims.play("samurai_idle", true);
      scene.data.set("playerMoveState", "idle");
    });
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
    console.log(newPlayerLife);
    player.setTint(0xff0000);
    if (newPlayerLife === 0) {
      bullet.destroy();
      const playingBgm = scene.data.get("playingBgm");

      playingBgm.stop();
      scene.data.set("isBulletTime", false);
      scene.data.set("aimOn", false);
      const blood = scene.physics.add
        .sprite(player.x + 10, player.y - 10, `samurai_blood`)
        .setName("blood")
        .setScale(2);

      blood.anims.play("blooding", true);
      deathSound.play();
      blood.on("animationcomplete-blooding", () => {
        blood.destroy();
      });
      player.anims.play("samurai_death", true);
      scene.data.set("playerMoveState", "death");

      scene.data.set("isCoolDown", false);
      bulletSpeed.value = -2400;
      scene.tweens.add({
        targets: player.anims,
        timeScale: 1,
      });
      if (!isWickTime) {
        scene.tweens.add({
          targets: shooter.anims,
          timeScale: 1,
        });
      }

      player.on("animationcomplete-samurai_death", () => {
        scene.scene.stop("quickDrawBulletScene"); // 현재 게임 씬 중단
        scene.scene.start("gameOverScene", { score: scene.data.get("score") }); // 게임 오버 씬 시작
      });
    }
  }
}
