export default class PreloadMap {
  constructor(scene) {
    scene.load.image("background", "asset/map/background.png");

    scene.load.image("ground", "asset/map/ground.png");
  }
}
