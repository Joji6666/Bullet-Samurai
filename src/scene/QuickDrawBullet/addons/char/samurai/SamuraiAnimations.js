export default class SamuraiAnimations {
  constructor(scene, player) {
    scene.anims.create({
      key: "samurai_attack",

      frames: scene.anims.generateFrameNumbers(`samurai_attack`, {
        start: 0,
        end: 5,
      }),

      frameRate: 60,

      repeat: 0,
    });

    scene.anims.create({
      key: "samurai_idle",

      frames: scene.anims.generateFrameNumbers(`samurai_idle`, {
        start: 0,
        end: 7,
      }),

      frameRate: 10,

      repeat: -1,
    });

    scene.anims.create({
      key: "samurai_death",

      frames: scene.anims.generateFrameNumbers(`samurai_death`, {
        start: 0,
        end: 5,
      }),

      frameRate: 10,

      repeat: 0,
    });

    scene.anims.create({
      key: "slash_hit",

      frames: scene.anims.generateFrameNumbers(`slash_hit`, {
        start: 0,
        end: 3,
      }),

      frameRate: 20,

      repeat: 0,
    });

    player.anims.play("samurai_idle", true);
    const container = scene.add.container(player.x, player.y - 100);
    // 쿨다운 프로그레스 바에 사용할 프레임
    const progressBarWidth = 100;
    const progressBarHeight = 10;
    const progressBarColor = 0x00ff00;

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
    let lastAttackTime = 0;
    const attackCooldown = 2000;

    scene.input.keyboard.on("keydown-SPACE", () => {
      if (player.moveState !== "death") {
        const currentTime = scene.time.now; // 현재 시간

        // 이전 공격 시간과의 차이를 계산하여 쿨타임 여부를 확인
        if (currentTime - lastAttackTime >= attackCooldown) {
          lastAttackTime = currentTime; // 현재 공격 시간을 저장
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
            }
          }, progressInterval);

          player.moveState = "attack";
          player.anims.play("samurai_attack", true);
          player.body.setSize(player.width * 0.88, player.height * 0.4);
          player.on("animationcomplete-samurai_attack", () => {
            player.body.setSize(player.width * 0.2, player.height * 0.3);
            player.anims.play("samurai_idle", true);
            player.moveState = "idle";
          });
        }
      }
    });
  }
}
