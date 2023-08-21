export default class PreloadWickSprite {
  constructor(scene: Phaser.Scene) {
    scene.load.spritesheet("wick_idle", "asset/char/wick/wick_idle.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    scene.load.spritesheet("wick_shoot", "asset/char/wick/wick_shoot.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    scene.load.spritesheet("wick_couch", "asset/char/wick/wick_couch.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    scene.load.spritesheet("wick_reload", "asset/char/wick/wick_reload.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    scene.load.spritesheet("wick_die", "asset/char/wick/wick_die.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    scene.load.spritesheet("wick_run", "asset/char/wick/wick_run.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }
}
