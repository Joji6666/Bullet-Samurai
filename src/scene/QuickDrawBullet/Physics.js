import { hitBullet } from "./addons/char/samurai/actions/hitBullet";

export default class Physics {
  constructor(scene, player, bulletSpeed) {
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
