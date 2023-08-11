export function hitBullet(scene, player) {
  const bullet = scene.data.get("bulletParticle");
  bullet.destroy();
  player.anims.play("samurai_death", true);
}
