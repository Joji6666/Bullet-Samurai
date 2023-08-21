import Phaser from "phaser";
import PreloadMap from "./addons/map/PreloadMap";

import AddMap from "./addons/map/AddMap";
import PreloadSamuraiSprite from "./addons/char/samurai/PreloadSamuraiSprite";
import SamuraiAnimations from "./addons/char/samurai/SamuraiAnimations";
import PreloadShooterSprite from "./addons/char/shooter/PreloadShooterSprite";
import ShooterAnimations from "./addons/char/shooter/ShooterAnimations";

import { autoBulletFire } from "./addons/char/shooter/actions/autoBulletFire";

import Physics from "./Physics";
import BulletTimeProgressBar from "./addons/BulletTimeProgressBar";
import { slash } from "./addons/char/samurai/actions/slash";
import PreloadSound from "./PreloadSound";
import AddSound from "./AddSound";
import { playRendomBgm } from "./playRendomBgm";
import PreloadWickSprite from "./addons/char/wick/PreloadWickSprite";
import WickAnimations from "./addons/char/wick/WickAnimations";
import { wickBulletFire } from "./addons/char/wick/actions/wickBulletFire";

const bulletSpeed = { value: -2400 };
let nextBulletTime = 0;
const minInterval = 3000;
const maxInterval = 10000;

const afterImageColors = [
  "0xFF0000", // 빨강
  "0xFF7F00", // 주황
  "0xFFFF00", // 노랑
  "0x00FF00", // 초록
  "0x0000FF", // 파랑
  "0x4B0082", // 남색
  "0x9400D3", // 보라
  "0xFF1493", // 분홍
  "0x00CED1", // 옥색
  "0xFFD700", // 금색
];

export default class QuickDrawBulletScene extends Phaser.Scene {
  constructor() {
    super("quickDrawBulletScene");
  }

  init(data: any) {
    bulletSpeed.value = -2400;
    this.data.set("isBulletTime", false);
    this.data.set("aimOn", false);
    this.data.set("isCoolDown", false);
    this.data.set("mainBgm", data.mainBgm);
    this.data.set("isWickTime", false);
    this.data.set("playingBgm", data.mainBgm);
    this.data.set("wickMoveState", "null");
    this.data.set("successHit", false);
    this.data.set("isBulletDestroy", true);
    this.data.set("wickLife", 3);
    this.data.set("playerLife", 2);
  }

  preload() {
    // Load map
    new PreloadMap(this);
    new PreloadSamuraiSprite(this);
    new PreloadShooterSprite(this);
    new PreloadWickSprite(this);
    new PreloadSound(this);
  }

  create() {
    this.data.set("isBulletTime", false);
    this.data.set("isCoolDown", false);
    this.data.set("attackAround", 0.1);
    this.data.set("aimOn", false);

    const mainBgm = this.data.get("mainBgm");
    mainBgm.once(Phaser.Sound.Events.COMPLETE, () => {
      playRendomBgm(this);
    });

    // Add Sound
    new AddSound(this);

    // Add Map image
    new AddMap(this);

    //player

    this.data.set("score", 0);
    this.add
      .text(50, 100, "score: 0", { fontSize: "32px", color: "black" })
      .setName("scoreText");

    // player init
    const player = this.physics.add
      .sprite(100, 640, `samurai_idle`)
      .setName("player")
      .setScale(2);
    this.data.set("player", player);
    this.data.set("playerMoveState", "idle");

    player.body.setSize(player.width * 0.2, player.height * 0.3);
    player.setDepth(2);
    // shooter init
    const shooter = this.physics.add
      .sprite(1100, 655, `shooter_idle`)
      .setName("shooter")
      .setScale(2);
    this.data.set("shooter", shooter);
    shooter.setFlipX(true);
    this.data.set("shooterMoveState", "idle");

    new WickAnimations(this);
    new SamuraiAnimations(this, player);
    new ShooterAnimations(this, shooter);

    new Physics(this, player, bulletSpeed);

    this.input.keyboard.on("keydown-Z", () => {
      const bulletTimeProgressBarWidth = this.data.get(
        "bulletTimeProgressBarWidth"
      );
      const attackAnimation = this.data.get("attackAnimation");
      const playerMoveState = this.data.get("playerMoveState");
      const getIsBulletTime = this.data.get("isBulletTime");
      const bulletTimeOnSonud = this.data.get("bulletTimeOnSound");
      const bulletTimeOffSonud = this.data.get("bulletTimeOffSound");

      if (bulletTimeProgressBarWidth > 0) {
        this.data.set("isBulletTime", !getIsBulletTime);
      }

      const isBulletTime = this.data.get("isBulletTime");
      if (isBulletTime) {
        const playingBgm = this.data.get("playingBgm");
        playingBgm.pause();
        this.data.set("playerAfterImages", []);
        bulletTimeOffSonud.stop();
        bulletTimeOnSonud.play();
        const eyeOfRonin = this.physics.add
          .sprite(player.x + 50, player.y, `eye_of_ronin`)
          .setName("eyeOfRonin")
          .setScale(2);
        eyeOfRonin.rotation = Phaser.Math.DegToRad(15);
        eyeOfRonin.setDepth(1);

        eyeOfRonin.anims.play("eye_of_ronin", true);
        this.data.set("eyeOfRonin", eyeOfRonin);
      } else {
        const playingBgm = this.data.get("playingBgm");
        playingBgm.resume();

        bulletTimeOnSonud.stop();
        bulletTimeOffSonud.play();
        if (playerMoveState === "attack") {
          // 기존 애니메이션 중지

          player.anims.stop();

          // frameRate 변경
          attackAnimation.frameRate = 60;

          slash(this, player);
        }
      }
    });

    new BulletTimeProgressBar(this);
  }

  update() {
    const shooter = this.data.get("shooter");
    const bulletInterval = Phaser.Math.Between(minInterval, maxInterval);
    const player = this.data.get("player");
    const background = this.data.get("background");
    const bulletTimeProgressBar = this.data.get("bulletTimeProgressBar");
    const isBulletTime = this.data.get("isBulletTime");
    const progressBarWidth = 100;
    const progressBarHeight = 10;
    const playerAfterImages: any[] = this.data.get("playerAfterImages");
    const bulletTimeProgressBarWidth = this.data.get(
      "bulletTimeProgressBarWidth"
    );
    const attackAnimation = this.data.get("attackAnimation");
    const attackAround = this.data.get("attackAround");
    const playerMoveState = this.data.get("playerMoveState");
    const shooterMoveState = this.data.get("shooterMoveState");
    const wickMoveState = this.data.get("wickMoveState");
    const isWickTime = this.data.get("isWickTime");
    const successHit = this.data.get("successHit");
    const isBulletDestroy = this.data.get("isBulletDestroy");
    const bullet = this.data.get("bulletParticle");
    if (isBulletTime) {
      const bullet = this.data.get("bulletParticle");

      if (isWickTime && successHit && player.isSwordOut && !isBulletDestroy) {
        bullet.setFlipX(true);
        bullet.setVelocityX(Math.abs(bulletSpeed.value * 0.1));
      }

      if (bullet && bullet.body?.velocity?.x && !successHit) {
        bullet.setVelocityX(bulletSpeed.value * 0.1);
      }
      attackAnimation.frameRate = 5;

      player.setTint(0x802080);
      shooter.setTint(0x404040);
      background.setTint(0x404040);

      this.data.set(
        "bulletTimeProgressBarWidth",
        bulletTimeProgressBarWidth - 0.1
      );

      bulletTimeProgressBar.clear();
      bulletTimeProgressBar.fillRect(
        -progressBarWidth / 2,
        -progressBarHeight - 5,
        bulletTimeProgressBarWidth,
        progressBarHeight
      );
      if (bulletTimeProgressBarWidth === 0) {
        this.data.set("isBulletTime", false);
      }

      if (
        playerMoveState === "attack" &&
        isWickTime &&
        successHit &&
        player.isSwordOut
      ) {
        bullet.setFlipX(true);
        bullet.setVelocityX(Math.abs(bulletSpeed.value * 0.1));
      }
    }

    if (!isWickTime) {
      this.tweens.add({
        targets: shooter.anims,
        timeScale: isBulletTime ? 0.1 : 1,
      });
    }

    if (!isBulletTime) {
      const eyeOfRonin = this.data.get("eyeOfRonin");

      if (eyeOfRonin) {
        eyeOfRonin.destroy();
      }

      const playerAfterImage = this.data.get("playerAfterImages");
      if (playerAfterImage) {
        playerAfterImage.forEach((afterImage: any) => {
          afterImage.destroy();
        });

        this.data.set("playerAfterImages", []);
      }

      const bullet = this.data.get("bulletParticle");

      if (isWickTime && successHit && player.isSwordOut && !isBulletDestroy) {
        bullet.setFlipX(true);
        bullet.setVelocityX(Math.abs(bulletSpeed.value));
      }

      if (bullet && bullet.body?.velocity?.x && !isWickTime) {
        bullet.setVelocityX(bulletSpeed.value);
      }

      attackAnimation.frameRate = 60;

      player.clearTint();
      shooter.clearTint();
      background.clearTint();
    }

    if (playerMoveState === "attack") {
      player.body.setSize(player.width * attackAround, player.height * 0.4);
      // 모든 잔상 위치 및 투명도 업데이트

      if (isBulletTime && player.body.offset.x < 57) {
        player.isSwordOut = true;
      }

      if (player.body.offset.x < 73 && !isBulletTime) {
        player.isSwordOut = true;
      }

      if (player.body.offset.x > 75) {
        player.isSwordOut = false;
      }

      this.data.set(
        "attackAround",
        isBulletTime ? attackAround + 0.0121 : attackAround + 0.162
      );

      if (isBulletTime) {
        const maxAfterImages = 10;
        const fadeSpeed = 0.2;

        for (let index = 0; index < maxAfterImages; index++) {
          if (playerAfterImages.length === 10) {
            return;
          }

          const newAfterImage = this.physics.add
            .sprite(player.x - index * 1.5, player.y, `samurai_idle`)
            .setScale(2)
            .setAlpha(0.3)
            .setDepth(1);

          playerAfterImages.push(newAfterImage);
        }

        if (playerAfterImages.length > 0) {
          playerAfterImages.forEach((afterImage: any, index: number) => {
            if (afterImage) {
              afterImage.setTint(afterImageColors[index]);
              afterImage.alpha -= fadeSpeed;
              afterImage.anims.play("samurai_attack", true);
              if (afterImage.alpha <= 0) {
                afterImage.destroy();
              }
            }
          });
        }
      }
    }

    if (shooter) {
      const currentTime = this.time.now;
      if (currentTime > nextBulletTime && shooterMoveState === "idle") {
        nextBulletTime = currentTime + bulletInterval;
        autoBulletFire(shooter, this, bulletSpeed);
      }
    }

    if (isWickTime && wickMoveState === "idle" && isBulletDestroy) {
      const currentTime = this.time.now;
      if (currentTime > nextBulletTime) {
        nextBulletTime = currentTime + bulletInterval;
        wickBulletFire(this, bulletSpeed);
      }
    }
    if (bullet) {
      if (bullet.x > 1300 && bullet.body?.velocity?.x) {
        bullet.destroy();
        this.data.set("isBulletDestroy", true);
        this.data.set("successHit", false);
      }
    }
  }
}
