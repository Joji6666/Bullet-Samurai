import { bulletFire } from "./bulletFire";

export function autoBulletFire(shooter, scene, interval) {
  function shoot() {
    shooter.anims.play("shooter_gun_out", true);
    shooter.on("animationcomplete-shooter_gun_out", () => {
      shooter.anims.play("shooter_aim", true);
      shooter.on("animationcomplete-shooter_aim", () => {
        shooter.anims.play("shooter_shoot", true);
        bulletFire(shooter, scene);
        shooter.on("animationcomplete-shooter_shoot", () => {
          shooter.setFlipX(false);
          shooter.anims.play("shooter_gun_in", true);
          shooter.on("animationcomplete-shooter_gun_in", () => {
            shooter.setFlipX(true);
            shooter.anims.play("shooter_idle", true);
          });
        });
      });
    });
  }

  shoot();
}
