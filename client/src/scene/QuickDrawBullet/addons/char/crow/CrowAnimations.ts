export default class CrowAnimations {
  constructor(scene: Phaser.Scene) {
    scene.anims.create({
      key: "crow_idle",

      frames: scene.anims.generateFrameNumbers(`crow_idle`, {
        start: 0,
        end: 3,
      }),

      frameRate: 5,

      repeat: -1,
    });
    scene.anims.create({
      key: "crow_idle_2",

      frames: scene.anims.generateFrameNumbers(`crow_idle_2`, {
        start: 0,
        end: 3,
      }),

      frameRate: 5,

      repeat: 0,
    });

    const crow = scene.physics.add.sprite(475, 620, `crow_idle`).setScale(2);
    scene.data.set("crow", crow);
    crow.anims.play("crow_idle", true);

    const crow2 = scene.physics.add.sprite(560, 620, `crow_idle`).setScale(2);
    scene.data.set("crow2", crow2);
    crow2.anims.play("crow_idle", true);
    crow2.setFlipX(true);
  }
}
