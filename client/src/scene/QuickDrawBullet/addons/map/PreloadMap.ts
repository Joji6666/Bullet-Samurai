export default class PreloadMap {
  constructor(scene: Phaser.Scene) {
    scene.load.image("background", "asset/map/background.png");

    scene.load.image("ground", "asset/map/ground.png");
  }
}
