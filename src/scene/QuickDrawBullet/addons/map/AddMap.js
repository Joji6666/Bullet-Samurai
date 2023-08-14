export default class AddMap {
  constructor(scene) {
    const background = scene.add.image(600, 100, "background").setScale(4);

    scene.data.set("background", background);
  }
}
