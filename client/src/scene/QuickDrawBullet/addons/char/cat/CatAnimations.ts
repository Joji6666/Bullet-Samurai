export default class CatAnimations {
  constructor(scene: Phaser.Scene) {
    scene.anims.create({
      key: "cat_idle",

      frames: scene.anims.generateFrameNumbers(`cat`, {
        start: 0,
        end: 14,
      }),

      frameRate: 5,

      repeat: -1,
    });

    const cat = scene.physics.add.sprite(800, 600, "cat").setScale(1.5);

    scene.data.set("cat", cat);
    cat.anims.play("cat_idle", true);
  }
}
