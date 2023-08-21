export default class AddMap {
  constructor(scene: Phaser.Scene) {
    const background = scene.add.image(600, 350, "background").setScale(4);

    scene.data.set("background", background);
  }
}
