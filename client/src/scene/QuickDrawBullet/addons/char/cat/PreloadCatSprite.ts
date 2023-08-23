export default class PreloadCatSprite {
  constructor(scene: Phaser.Scene) {
    scene.load.spritesheet("cat", "asset/char/cat/cat_spritesheet.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }
}
