import { bulletFire } from "./bulletFire";

export function autoBulletFire(
  shooter: any,
  scene: any,
  bulletSpeed: { value: number }
) {
  const score = scene.data.get("score");
  const aimOn = scene.data.get("aimOn");
  const shooterCrouchSwich = Phaser.Math.Between(1, 3);
  function shoot() {
    if (score > 500) {
      scene.data.set("isShooterCrouch", true);
      const isShooterCrouch = scene.data.get("isShooterCrouch");

      if (isShooterCrouch && shooterCrouchSwich === 1) {
        shooter.anims.play("shooter_crouch", true);
        scene.data.set("shooterMoveState", "crouchGunFire");
        scene.data.set("isCrouchBullet", true);
        shooter.on("animationcomplete-shooter_crouch", () => {
          shooter.anims.play("shooter_crouch_aim", true);
          shooter.on("animationcomplete-shooter_crouch_aim", () => {
            shooter.anims.play("shooter_crouch_shoot", true);
            const gunSound = scene.data.get("gunSound");
            gunSound.play();

            bulletFire(shooter, scene, bulletSpeed);
            shooter.on("animationcomplete-shooter_crouch_shoot", () => {
              shooter.anims.play("shooter_idle", true);
              scene.data.set("shooterMoveState", "idle");
              shooter.removeAllListeners();
            });
          });
        });
        return;
      }
    }

    if (score > 4000 && aimOn) {
      shooter.anims.play("shooter_shoot", true);
      bulletFire(shooter, scene, bulletSpeed);
      scene.data.set("shooterMoveState", "idle");
      scene.data.set("isCrouchBullet", false);
      shooter.removeAllListeners();
      return;
    }

    shooter.anims.play("shooter_gun_out", true);
    scene.data.set("isCrouchBullet", false);
    scene.data.set("shooterMoveState", "gunFire");
    shooter.on("animationcomplete-shooter_gun_out", () => {
      shooter.anims.play("shooter_aim", true);
      shooter.on("animationcomplete-shooter_aim", () => {
        shooter.anims.play("shooter_shoot", true);
        const gunSound = scene.data.get("gunSound");
        gunSound.play();

        bulletFire(shooter, scene, bulletSpeed);
        if (score > 4000) {
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
