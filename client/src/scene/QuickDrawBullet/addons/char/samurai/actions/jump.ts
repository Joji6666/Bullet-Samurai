const jumpCooldown = 1700;
const progressBarColor = 0xff0000;

export function jump(scene: Phaser.Scene, player: any) {
  scene.data.set("playerMoveState", "jump");
  player.anims.play("samurai_jump", true);
  player.setVelocityY(-400);
  player.on("animationcomplete-samurai_jump", () => {
    setTimeout(() => {
      player.anims.play("samurai_fall", true);
      scene.data.set("playerMoveState", "fall");
      player.setVelocityY(400);
      setTimeout(() => {
        player.setVelocityY(0);
        player.anims.play("samurai_idle", true);
        scene.data.set("playerMoveState", "idle");
        player.x = 100;
        player.y = 640;
        scene.data.set("isCoolDown", true);
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
        const progressBarMaxWidth = progressBarWidth;
        let progressBarCurrentWidth = 0;
        const progressInterval = jumpCooldown / 100; // 1% 당 시간 간격 계산
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
      }, 320);
    }, 100);
  });
}
