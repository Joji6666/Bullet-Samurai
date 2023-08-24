import { playRendomBgm } from "../../../../playRendomBgm";

export function wickHitBullet(scene: Phaser.Scene) {
  const wick = scene.data.get("wick");
  const wickLife = scene.data.get("wickLife");
  const bullet = scene.data.get("bulletParticle");
  const playingBgm = scene.data.get("playingBgm");
  const bulletAngle = scene.data.get("bulletAngle");
  const isWickCrouch = scene.data.get("isWickCrouch");

  bullet.destroy();

  if (bulletAngle === "down" && !isWickCrouch) {
    const wickVest = scene.add
      .image(wick.x, wick.y - 50, "wick_vest")
      .setScale(0.5);
    scene.data.set("isBulletDestroy", true);
    scene.data.set("successHit", false);
    const wickVestHitEffect = scene.physics.add
      .sprite(wick.x - 15, wick.y, "wick_vest_hit")
      .setScale(0.5);
    const vestHitSound = scene.data.get("vestHitSound");
    vestHitSound.play();
    wickVestHitEffect.anims.play("wick_vest_hit", true);

    wickVestHitEffect.on("animationcomplete-wick_vest_hit", () => {
      wickVestHitEffect.destroy();
    });
    setTimeout(() => {
      wickVest.setVisible(false);
    }, 50);
    setTimeout(() => {
      wickVest.setVisible(true);
    }, 75);
    setTimeout(() => {
      wickVest.setVisible(false);
    }, 100);
    setTimeout(() => {
      wickVest.setVisible(true);
    }, 125);
    setTimeout(() => {
      wickVest.setVisible(false);
    }, 150);
    setTimeout(() => {
      wickVest.setVisible(true);
    }, 175);

    setTimeout(() => {
      wickVest.destroy();
    }, 500);
    return;
  }

  wick.setTint(0xff0000);
  setTimeout(() => {
    wick.clearTint();
  }, 600);

  scene.data.set("wickLife", wickLife - 1);
  scene.data.set("isBulletDestroy", true);
  scene.data.set("successHit", false);

  const newWickLife = scene.data.get("wickLife");

  const prevWickLifeBar = scene.data.get("wickLifeBar");
  const newWickLifeBar = scene.add
    .image(prevWickLifeBar.x, prevWickLifeBar.y, `wick_life_${newWickLife}`)
    .setScale(2.5, 2);
  prevWickLifeBar.destroy();
  scene.data.set("wickLifeBar", newWickLifeBar);

  if (newWickLife === 0) {
    wick.anims.play("wick_die", true);
    scene.data.set("isWickTime", false);
    scene.data.set("successHit", false);
    wick.on("animationcomplete-wick_die", () => {
      setTimeout(() => {
        wick.setVisible(false);
      }, 50);
      setTimeout(() => {
        wick.setVisible(true);
      }, 75);
      setTimeout(() => {
        wick.setVisible(false);
      }, 100);
      setTimeout(() => {
        wick.setVisible(true);
      }, 125);
      setTimeout(() => {
        wick.setVisible(false);
      }, 150);
      setTimeout(() => {
        wick.setVisible(true);
      }, 175);
      setTimeout(() => {
        wick.setVisible(false);
      }, 200);
      setTimeout(() => {
        wick.setVisible(true);
      }, 225);
      setTimeout(() => {
        wick.setVisible(false);
      }, 250);
      setTimeout(() => {
        wick.setVisible(true);
      }, 275);
      setTimeout(() => {
        wick.setVisible(false);
      }, 300);
      setTimeout(() => {
        wick.setVisible(true);
      }, 325);

      setTimeout(() => {
        scene.data.set("isWickTime", false);
        playingBgm.stop();
        playRendomBgm(scene);
        const shooter = scene.physics.add
          .sprite(1300, 655, `shooter_idle`)
          .setName("shooter")
          .setScale(2);
        shooter.anims.play("shooter_run", true);
        scene.data.set("shooter", shooter);
        shooter.setFlipX(true);
        shooter.setVelocityX(-200);
        setTimeout(() => {
          shooter.setVelocityX(0);
          scene.data.set("shooterMoveState", "idle");
          shooter.anims.play("shooter_idle", true);
          wick.destroy();
          scene.data.set("isWickDead", true);
          newWickLifeBar.destroy();
        }, 1000);
      }, 1000);
    });
  }
}
