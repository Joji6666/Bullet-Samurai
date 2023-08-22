const bulletTimeProgressBarColor = 0xff0000;

export default class BulletTimeProgressBar {
  constructor(scene: Phaser.Scene) {
    const bulletTimeProgressBarContainer = scene.add.container(200, 200);
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
    const eyeOfRoninIcon = scene.add
      .image(15, 195, "eye_of_ronin_icon")
      .setScale(0.5);
    bulletTimeProgressBarContainer.add(bulletTimeProgressBar);
    const text = scene.add.text(30, 185, "eye of ronin", {
      fontSize: "16px",
      fontFamily: "InfiniteFont", // CSS에서 정의한 font-family 이름 사용
      color: "skyblue",
    });
    scene.add.existing(bulletTimeProgressBarContainer);
    scene.data.set("bulletTimeProgressBar", bulletTimeProgressBar);
    const bulletTimeProgressBarWidth = progressBarWidth; // 프로그레스 바 전체 길이
    scene.data.set("bulletTimeProgressBarWidth", bulletTimeProgressBarWidth);
  }
}
