export default class SamuraiAnimations {
  constructor(scene, player) {
    scene.anims.create({
      key: "samurai_attack",

      frames: scene.anims.generateFrameNumbers(`samurai_attack`, {
        start: 0,
        end: 5,
      }),

      frameRate: 20,

      repeat: 0,
    });

    scene.anims.create({
      key: "samurai_idle",

      frames: scene.anims.generateFrameNumbers(`samurai_idle`, {
        start: 0,
        end: 7,
      }),

      frameRate: 10,

      repeat: -1,
    });

    scene.anims.create({
      key: "samurai_death",

      frames: scene.anims.generateFrameNumbers(`samurai_death`, {
        start: 0,
        end: 5,
      }),

      frameRate: 10,

      repeat: 0,
    });

    player.anims.play("samurai_idle", true);

    scene.input.keyboard.on("keydown-SPACE", () => {
      player.moveState = "attack";

      player.anims.play("samurai_attack", true);
      player.on("animationcomplete-samurai_attack", () => {
        player.anims.play("samurai_idle", true);
      });
    });
  }
}
