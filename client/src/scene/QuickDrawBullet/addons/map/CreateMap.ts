export default class CreateMap {
  constructor(
    platforms: Phaser.Physics.Arcade.StaticGroup,
    scene: Phaser.Scene
  ) {
    const ground = platforms.create(400, 0, "ground").setScale(2).refreshBody();

    scene.data.set("ground", ground);
  }
}
