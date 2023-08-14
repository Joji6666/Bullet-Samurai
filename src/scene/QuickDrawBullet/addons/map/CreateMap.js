export default class CreateMap {
  constructor(platforms, scene) {
    const grond = platforms.create(400, 50, "ground").setScale(2).refreshBody();

    scene.data.set("ground", grond);
  }
}
