export default class PreloadCrowSprite {
  constructor(scene: Phaser.Scene) {
    scene.load.spritesheet("crow_idle", "asset/char/crow/crow_idle.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
    scene.load.spritesheet("crow_idle_2", "asset/char/crow/crow_idle2.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
  }
}
