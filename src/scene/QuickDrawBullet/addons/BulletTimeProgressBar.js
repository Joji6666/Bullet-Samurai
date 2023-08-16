const bulletTimeProgressBarColor = 0xff0000;

export default class BulletTimeProgressBar {
  constructor(scene) {
    const bulletTimeProgressBarContainer = scene.add.container(200, 200);
    const progressBarWidth = 100;
    const progressBarHeight = 10;

    const bulletTimeProgressBar = (scene.bulletTimeProgressBar =
      scene.add.graphics());
    scene.bulletTimeProgressBar.fillStyle(bulletTimeProgressBarColor, 1);
    scene.bulletTimeProgressBar.fillRect(
      -progressBarWidth / 2,
      -progressBarHeight - 5,
      progressBarWidth,
      progressBarHeight
    );
    bulletTimeProgressBarContainer.add(scene.bulletTimeProgressBar);
    const text = scene.add.text(30, 185, "eye of ronin", {
      fontSize: "14px",
    });
    scene.add.existing(bulletTimeProgressBarContainer);
    scene.data.set("bulletTimeProgressBar", bulletTimeProgressBar);
    scene.bulletTimeProgressBarWidth = progressBarWidth; // 프로그레스 바 전체 길이
  }
}
