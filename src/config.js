import Phaser from "phaser";
import QuickDrawBulletScene from "./scene/QuickDrawBullet/QuickDrawBulletScene";
import GameOverScene from "./scene/GameOver/GameOverScene";

const config = {
  type: Phaser.AUTO,
  parent: "app",
  width: 1200,
  height: 800,
  physics: {
    default: "arcade",
    arcade: { debug: true },
  },
  scene: [QuickDrawBulletScene, GameOverScene],
};

export default new Phaser.Game(config);
