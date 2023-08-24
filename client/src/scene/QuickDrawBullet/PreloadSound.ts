export default class PreloadSound {
  constructor(scene: Phaser.Scene) {
    scene.load.audio("background_music", "asset/sound/background.mp3");
    scene.load.audio("bullet_time_off", "asset/sound/bullet_time_off.mp3");
    scene.load.audio("bullet_time_on", "asset/sound/bullet_time_on.mp3");
    scene.load.audio("gun", "asset/sound/gun.mp3");
    scene.load.audio("slash_sound", "asset/sound/slash.wav");
    scene.load.audio("death_sound", "asset/sound/death.mp3");
    scene.load.audio("bgm_1", "asset/sound/bgm_1.mp3");
    scene.load.audio("bgm_2", "asset/sound/bgm_2.mp3");
    scene.load.audio("bgm_3", "asset/sound/bgm_3.mp3");
    scene.load.audio("bgm_4", "asset/sound/bgm_4.mp3");
    scene.load.audio("bgm_5", "asset/sound/bgm_5.mp3");
    scene.load.audio("bgm_6", "asset/sound/bgm_6.mp3");
    scene.load.audio("wick_bgm", "asset/sound/wick_bgm.mp3");
    scene.load.audio("swing_sound", "asset/sound/swing_sound.mp3");
    scene.load.audio("vest_hit_sound", "asset/sound/vest_hit_sound.mp3");
  }
}
