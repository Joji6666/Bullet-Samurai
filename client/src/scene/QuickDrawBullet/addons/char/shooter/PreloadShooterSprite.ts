export default class PreloadShooterSprite {
  constructor(scene: Phaser.Scene) {
    scene.load.image("bullet", "asset/effect/bullet.png");

    scene.load.spritesheet(
      "shooter_idle",
      "asset/char/shooter/shooter_idle.png",
      {
        frameWidth: 66,
        frameHeight: 66,
      }
    );

    scene.load.spritesheet(
      "shooter_aim",
      "asset/char/shooter/shooter_aim.png",
      {
        frameWidth: 66,
        frameHeight: 66,
      }
    );

    scene.load.spritesheet(
      "shooter_gun_out",
      "asset/char/shooter/shooter_gun_out.png",
      {
        frameWidth: 66,
        frameHeight: 66,
      }
    );

    scene.load.spritesheet(
      "shooter_gun_in",
      "asset/char/shooter/shooter_gun_in.png",
      {
        frameWidth: 66,
        frameHeight: 66,
      }
    );

    scene.load.spritesheet(
      "shooter_shoot",
      "asset/char/shooter/shooter_shoot.png",
      {
        frameWidth: 66,
        frameHeight: 66,
      }
    );

    scene.load.spritesheet(
      "shooter_reload",
      "asset/char/shooter/shooter_reload.png",
      {
        frameWidth: 66,
        frameHeight: 66,
      }
    );
    scene.load.spritesheet(
      "shooter_run",
      "asset/char/shooter/shooter_run.png",
      {
        frameWidth: 66,
        frameHeight: 66,
      }
    );
  }
}
