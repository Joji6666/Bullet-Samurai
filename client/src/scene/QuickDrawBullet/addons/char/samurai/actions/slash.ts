const attackCooldown = 1700;
const progressBarColor = 0xff0000;

export function slash(scene: Phaser.Scene, player: any) {
  const container = scene.add.container(player.x, player.y - 100);
  // 쿨다운 프로그레스 바에 사용할 프레임
  const progressBarWidth = 100;
  const progressBarHeight = 10;

  const progressBar = scene.add.graphics();
  progressBar.fillStyle(progressBarColor, 1);
  progressBar.fillRect(
    -progressBarWidth / 2,
    -progressBarHeight - 5,
    0,
    progressBarHeight
  );
  container.add(progressBar);
  scene.add.existing(container);

  const isCoolDown = scene.data.get("isCoolDown");
  const playerMoveState = scene.data.get("playerMoveState");

  if (playerMoveState !== "death" && !isCoolDown) {
    scene.data.set("playerMoveState", "attack");
    const swingSound = scene.data.get("swingSound");
    swingSound.play();
    player.anims.play("samurai_attack", true);

    player.on("animationcomplete-samurai_attack", () => {
      scene.data.set("attackAround", 0.1);
      player.body.setSize(player.width * 0.2, player.height * 0.3);
      player.anims.play("samurai_idle", true);
      scene.data.set("playerMoveState", "idle");
      scene.data.set("isCoolDown", true);

      const progressBarMaxWidth = progressBarWidth;
      let progressBarCurrentWidth = 0;
      const progressInterval = attackCooldown / 100; // 1% 당 시간 간격 계산
      const progressIntervalId = setInterval(() => {
        progressBarCurrentWidth += progressBarMaxWidth / 100;
        progressBar.clear();
        progressBar.fillRect(
          -progressBarWidth / 2,
          -progressBarHeight - 5,
          progressBarCurrentWidth,
          progressBarHeight
        );

        if (progressBarCurrentWidth >= progressBarMaxWidth) {
          clearInterval(progressIntervalId);
          progressBar.clear();
          scene.data.set("isCoolDown", false);
        }
      }, progressInterval);
    });
  }
}
