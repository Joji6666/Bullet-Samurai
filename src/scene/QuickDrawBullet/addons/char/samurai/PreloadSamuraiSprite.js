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

    scene.load.spritesheet("slash_hit", "asset/effect/slash_hit_3.png", {
      frameWidth: 56,
      frameHeight: 23,
    });

    scene.load.spritesheet("samurai_blood", "asset/char/samurai/blood.png", {
      frameWidth: 66,
      frameHeight: 66,
    });

    scene.load.spritesheet(
      "eye_of_ronin",
      "asset/char/samurai/eyeOfRonin.png",
      {
        frameWidth: 66,
        frameHeight: 51,
      }
    );
    scene.load.spritesheet(
      "eye_of_ronin_1",
      "asset/char/samurai/eye_of_ronin1.png",
      {
        frameWidth: 32,
        frameHeight: 37,
      }
    );
    scene.load.spritesheet(
      "eye_of_ronin_2",
      "asset/char/samurai/eye_of_ronin2.png",
      {
        frameWidth: 32,
        frameHeight: 37,
      }
    );
  }
}
