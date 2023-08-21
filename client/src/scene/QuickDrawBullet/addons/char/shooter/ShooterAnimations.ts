export default class ShooterAnimations {
  constructor(scene: Phaser.Scene, shooter: any) {
    scene.anims.create({
      key: "shooter_idle",

      frames: scene.anims.generateFrameNumbers(`shooter_idle`, {
        start: 0,
        end: 3,
      }),

      frameRate: 5,

      repeat: -1,
    });

    scene.anims.create({
      key: "shooter_aim",

      frames: scene.anims.generateFrameNumbers(`shooter_aim`, {
        start: 0,
        end: 5,
      }),

      frameRate: 10,

      repeat: 0,
    });

    scene.anims.create({
      key: "shooter_gun_out",

      frames: scene.anims.generateFrameNumbers(`shooter_gun_out`, {
        start: 0,
        end: 8,
      }),

      frameRate: 10,

      repeat: 0,
    });

    scene.anims.create({
      key: "shooter_gun_in",

      frames: scene.anims.generateFrameNumbers(`shooter_gun_in`, {
        start: 0,
        end: 8,
      }),

      frameRate: 10,

      repeat: 0,
    });

    scene.anims.create({
      key: "shooter_shoot",

      frames: scene.anims.generateFrameNumbers(`shooter_shoot`, {
        start: 0,
        end: 4,
      }),

      frameRate: 10,

      repeat: 0,
    });

    scene.anims.create({
      key: "shooter_reload",

      frames: scene.anims.generateFrameNumbers(`shooter_reload`, {
        start: 0,
        end: 16,
      }),

      frameRate: 20,

      repeat: 0,
    });

    scene.anims.create({
      key: "shooter_run",

      frames: scene.anims.generateFrameNumbers(`shooter_run`, {
        start: 0,
        end: 7,
      }),

      frameRate: 20,

      repeat: -1,
    });

    shooter.anims.play("shooter_idle", true);
  }
}
