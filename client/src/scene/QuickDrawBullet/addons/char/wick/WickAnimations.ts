export default class WickAnimations {
  constructor(scene: Phaser.Scene) {
    scene.anims.create({
      key: "wick_idle",

      frames: scene.anims.generateFrameNumbers(`wick_idle`, {
        start: 0,
        end: 3,
      }),

      frameRate: 10,

      repeat: -1,
    });
    scene.anims.create({
      key: "wick_shoot",

      frames: scene.anims.generateFrameNumbers(`wick_shoot`, {
        start: 0,
        end: 3,
      }),

      frameRate: 12,

      repeat: 0,
    });
    scene.anims.create({
      key: "wick_crouch",

      frames: scene.anims.generateFrameNumbers(`wick_crouch`, {
        start: 0,
        end: 2,
      }),

      frameRate: 30,

      repeat: 0,
    });
    scene.anims.create({
      key: "wick_reload",

      frames: scene.anims.generateFrameNumbers(`wick_reload`, {
        start: 0,
        end: 3,
      }),

      frameRate: 10,

      repeat: 0,
    });
    scene.anims.create({
      key: "wick_die",

      frames: scene.anims.generateFrameNumbers(`wick_die`, {
        start: 0,
        end: 3,
      }),

      frameRate: 10,

      repeat: 0,
    });
    scene.anims.create({
      key: "wick_run",

      frames: scene.anims.generateFrameNumbers(`wick_run`, {
        start: 0,
        end: 2,
      }),

      frameRate: 10,

      repeat: -1,
    });
  }
}
