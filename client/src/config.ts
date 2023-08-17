import Phaser from "phaser";

import GameOverScene from "./scene/GameOver/GameOverScene";
import GameStartScene from "./scene/GameStart/GameStartScene";
import QuickDrawBulletScene from "./scene/QuickDrawBullet/QuickDrawBulletScene";

const config = {
  type: Phaser.WEBGL,
  parent: "app",
  width: 1200,
  height: 700,
  physics: {
    default: "arcade",
    // arcade: { debug: true },
  },
  scene: [GameStartScene, QuickDrawBulletScene, GameOverScene],
};

export default new Phaser.Game(config);
