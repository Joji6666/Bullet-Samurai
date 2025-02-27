let bgmList = ["bgm_1", "bgm_2", "bgm_3", "bgm_4", "bgm_5", "bgm_6"];
let currentBGM: any;
let currentBGMIndex = Phaser.Math.Between(0, 5);

export function playRendomBgm(scene: Phaser.Scene) {
  // 현재 재생 중인 배경음악을 중지
  if (currentBGM) {
    currentBGM.stop();
  }

  // 선택된 배경음악 재생
  currentBGM = scene.sound.add(bgmList[currentBGMIndex]);
  currentBGM.setVolume(0.2);
  scene.data.set("playingBgm", currentBGM);
  currentBGM.play();

  // 배경음악이 끝나면 다음 배경음악을 재생하도록 설정
  currentBGM.once(Phaser.Sound.Events.COMPLETE, () => {
    playRendomBgm(scene);
  });
}
