import Phaser from "phaser";
import QuickDrawBulletScene from "./scene/QuickDrawBullet/QuickDrawBulletScene";
import GameOverScene from "./scene/GameOver/GameOverScene";
import GameStartScene from "./scene/GameStart/GameStartScene";

const config = {
  type: Phaser.WEBGL,
  parent: "app",
  width: 1200,
  height: 700,
  physics: {
    default: "arcade",
    arcade: { debug: true },
  },
  scene: [GameStartScene, QuickDrawBulletScene, GameOverScene],
};

export default new Phaser.Game(config);
