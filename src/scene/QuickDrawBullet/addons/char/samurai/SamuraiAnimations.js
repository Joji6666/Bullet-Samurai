const attackCooldown = 2000;
const progressBarColor = 0x00ff00;
export default class SamuraiAnimations {
  constructor(scene, player) {
    scene.attackAnimation = scene.anims.create({
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

    scene.anims.create({
      key: "blooding",

      frames: scene.anims.generateFrameNumbers(`samurai_blood`, {
        start: 0,
        end: 27,
      }),

      frameRate: 60,

      repeat: 0,
    });

    player.anims.play("samurai_idle", true);
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

    scene.input.keyboard.on("keydown-SPACE", () => {
      if (player.moveState !== "death" && !scene.isCoolDown) {
        player.moveState = "attack";
        player.anims.play("samurai_attack", true);

        player.on("animationcomplete-samurai_attack", () => {
          console.log("attack close");
          scene.attackAround = 0.1;
          player.body.setSize(player.width * 0.2, player.height * 0.3);
          player.anims.play("samurai_idle", true);
          player.moveState = "idle";
          scene.isCoolDown = true;

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
              scene.isCoolDown = false;
            }
          }, progressInterval);
        });
      }
    });
  }
}
