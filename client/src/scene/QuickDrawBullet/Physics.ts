import { hitBullet } from "./addons/char/samurai/actions/hitBullet";
import { wickHitBullet } from "./addons/char/wick/actions/wickHitBullet";

export default class Physics {
  constructor(scene: any, player: any, bulletSpeed: { value: number }) {
    const bullet = scene.physics.add.group({
      allowGravity: false,
    });
   
    scene.data.set("bullets", bullet);

    scene.physics.add.overlap(
      bullet,
      player,
      () => hitBullet(scene, player, bulletSpeed),
      null,
      scene
    );
  
  }
}
