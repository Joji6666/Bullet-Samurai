import Phaser from "phaser";
import QuickDrawBulletScene from "./scene/QuickDrawBullet/QuickDrawBulletScene";

const config = {
  type: Phaser.AUTO,
  parent: "app",
  width: 1200,
  height: 800,
  physics: {
    default: "arcade",
    arcade: {},
  },
  scene: [QuickDrawBulletScene],
};

export default new Phaser.Game(config);
