export default class PreloadSamuraiSprite {
  constructor(scene: Phaser.Scene) {
    scene.load.image("eye_of_ronin_icon", "asset/icon/eye_of_ronin_icon_2.png");
    scene.load.image("samurai_life_4", "asset/ui/player_life_5.png");
    scene.load.image("samurai_life_3", "asset/ui/player_life_4.png");
    scene.load.image("samurai_life_2", "asset/ui/player_life_3.png");
    scene.load.image("samurai_life_1", "asset/ui/player_life_2.png");
    scene.load.image("samurai_life_0", "asset/ui/player_life_1.png");

    scene.load.spritesheet(
      "eye_of_ronin_aura",
      "asset/ui/eye_of_ronin_aura.png",
      {
        frameWidth: 32,
        frameHeight: 30,
      }
    );

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

    scene.load.spritesheet("samurai_hit", "asset/char/samurai/hit.png", {
      frameWidth: 200,
      frameHeight: 200,
    });
    scene.load.spritesheet("samurai_jump", "asset/char/samurai/jump.png", {
      frameWidth: 200,
      frameHeight: 200,
    });

    scene.load.spritesheet("samurai_fall", "asset/char/samurai/fall.png", {
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
      "asset/char/samurai/eye_of_ronin.png",
      {
        frameWidth: 192,
        frameHeight: 192,
      }
    );
  }
}
