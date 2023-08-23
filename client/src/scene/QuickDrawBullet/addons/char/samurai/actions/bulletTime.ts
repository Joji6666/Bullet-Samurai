import { slash } from "./slash";

export function bulletTime(scene: Phaser.Scene, player: any) {
  const bulletTimeProgressBarWidth = scene.data.get(
    "bulletTimeProgressBarWidth"
  );
  const attackAnimation = scene.data.get("attackAnimation");
  const samuraiIdleAnimation = scene.data.get("samuraiIdleAnimation");
  const playerMoveState = scene.data.get("playerMoveState");
  const getIsBulletTime = scene.data.get("isBulletTime");
  const bulletTimeOnSonud = scene.data.get("bulletTimeOnSound");
  const bulletTimeOffSonud = scene.data.get("bulletTimeOffSound");
  const isWickTime = scene.data.get("isWickTime");
  const isCrouchBullet = scene.data.get("isCrouchBullet");
  console.log(isCrouchBullet);
  if (bulletTimeProgressBarWidth > 0 && !isWickTime && !isCrouchBullet) {
    scene.data.set("isBulletTime", !getIsBulletTime);
  }

  const isBulletTime = scene.data.get("isBulletTime");
  if (isBulletTime) {
    const playingBgm = scene.data.get("playingBgm");
    playingBgm.pause();
    scene.data.set("playerAfterImages", []);
    bulletTimeOffSonud.stop();
    bulletTimeOnSonud.play();
    const eyeOfRonin = scene.physics.add
      .sprite(player.x + 50, player.y, `eye_of_ronin`)
      .setName("eyeOfRonin")
      .setScale(2);
    eyeOfRonin.rotation = Phaser.Math.DegToRad(15);
    eyeOfRonin.setDepth(1);

    eyeOfRonin.anims.play("eye_of_ronin", true);
    scene.data.set("eyeOfRonin", eyeOfRonin);

    if (playerMoveState === "idle") {
      player.anims.stop();
      samuraiIdleAnimation.frameRate = 3;
      player.anims.play("samurai_idle", true);
    }
  } else {
    const playingBgm = scene.data.get("playingBgm");
    playingBgm.resume();

    bulletTimeOnSonud.stop();
    bulletTimeOffSonud.play();

    if (playerMoveState === "idle") {
      player.anims.stop();
      samuraiIdleAnimation.frameRate = 10;
      player.anims.play("samurai_idle", true);
    }

    if (playerMoveState === "attack") {
      // 기존 애니메이션 중지

      player.anims.stop();

      // frameRate 변경
      attackAnimation.frameRate = 60;

      slash(scene, player);
    }
  }
}
