export default class PreloadSamuraiSprite {
  constructor(scene) {
    scene.load.spritesheet("samurai_idle", "asset/char/samurai/idle.png", {
      frameWidth: 200,
      frameHeight: 200,
    });

    scene.load.spritesheet("samurai_attack", "asset/char/samurai/attack.png", {
      frameWidth: 200,
      frameHeight: 200,
    });

    scene.load.spritesheet("samurai_death", "asset/char/samurai/death.png", {
      frameWidth: 200,
      frameHeight: 200,
    });
  }
}
