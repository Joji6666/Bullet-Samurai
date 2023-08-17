import { bulletFire } from "./bulletFire";

export function autoBulletFire(
  shooter: any,
  scene: any,
  bulletSpeed: { value: number }
) {
  const score = scene.data.get("score");
  const aimOn = scene.data.get("aimOn");
  function shoot() {
    if (score > 2000 && aimOn) {
      shooter.anims.play("shooter_shoot", true);
      bulletFire(shooter, scene, bulletSpeed);
      scene.data.set("shooterMoveState", "idle");

      shooter.removeAllListeners();
      return;
    }

    shooter.anims.play("shooter_gun_out", true);
    scene.data.set("shooterMoveState", "gunFire");
    shooter.on("animationcomplete-shooter_gun_out", () => {
      shooter.anims.play("shooter_aim", true);
      shooter.on("animationcomplete-shooter_aim", () => {
        shooter.anims.play("shooter_shoot", true);
        bulletFire(shooter, scene, bulletSpeed);
        if (score > 2000) {
          scene.data.set("aimOn", true);
          scene.data.set("shooterMoveState", "idle");
          shooter.removeAllListeners();
          return;
        }
        shooter.on("animationcomplete-shooter_shoot", () => {
          shooter.setFlipX(false);
          shooter.anims.play("shooter_gun_in", true);
          shooter.on("animationcomplete-shooter_gun_in", () => {
            shooter.setFlipX(true);
            shooter.anims.play("shooter_idle", true);
            scene.data.set("shooterMoveState", "idle");
            shooter.removeAllListeners();
          });
        });
      });
    });
  }

  shoot();
}
