const bulletTimeProgressBarColor = 0xff0000;

export default class BulletTimeProgressBar {
  constructor(scene: Phaser.Scene) {
    const bulletTimeProgressBarContainer = scene.add.container(210, 205);
    const progressBarWidth = 100;
    const progressBarHeight = 10;

    const bulletTimeProgressBar = scene.add.graphics();
    bulletTimeProgressBar.fillStyle(bulletTimeProgressBarColor, 1);
    bulletTimeProgressBar.fillRect(
      -progressBarWidth / 2,
      -progressBarHeight - 5,
      progressBarWidth,
      progressBarHeight
    );

    const eyeOfRoninAura = scene.physics.add
      .sprite(210, 195, "eye_of_ronin_aura")
      .setScale(4.5, 0.6);

    eyeOfRoninAura.anims.play("eye_of_ronin_aura", true);
    const eyeOfRoninIcon = scene.add
      .image(15, 195, "eye_of_ronin_icon")
      .setScale(0.5);
    bulletTimeProgressBarContainer.add(bulletTimeProgressBar);
    const text = scene.add.text(30, 185, "", {
      fontSize: "14px",
      fontFamily: "InfiniteFont", // CSS에서 정의한 font-family 이름 사용
      color: "cyan",
    });

    scene.data.set("eyeOfRoninText", text);
    scene.add.existing(bulletTimeProgressBarContainer);
    scene.data.set("bulletTimeProgressBar", bulletTimeProgressBar);
    const bulletTimeProgressBarWidth = progressBarWidth; // 프로그레스 바 전체 길이
    scene.data.set("bulletTimeProgressBarWidth", bulletTimeProgressBarWidth);
  }
}
