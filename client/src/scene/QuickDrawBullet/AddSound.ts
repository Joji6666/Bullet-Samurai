export default class AddSound {
  constructor(scene: Phaser.Scene) {
    const slashSound = scene.sound.add("slash_sound");
    scene.data.set("slashSound", slashSound);
    const gunSound = scene.sound.add("gun");
    scene.data.set("gunSound", gunSound);
    const bulletTimeOnSound = scene.sound.add("bullet_time_on");
    scene.data.set("bulletTimeOnSound", bulletTimeOnSound);
    const bulletTimeOffSound = scene.sound.add("bullet_time_off");
    scene.data.set("bulletTimeOffSound", bulletTimeOffSound);
    const backgroundMusic = scene.sound.add("background_music");
    scene.data.set("backgroundMusic", backgroundMusic);
    const deathSound = scene.sound.add("death_sound");
    scene.data.set("deathSound", deathSound);
  }
}
