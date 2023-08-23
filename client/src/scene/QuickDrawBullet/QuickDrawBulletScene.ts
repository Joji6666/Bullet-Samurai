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
import PreloadSound from "./PreloadSound";
import AddSound from "./AddSound";
import { playRendomBgm } from "./playRendomBgm";
import PreloadWickSprite from "./addons/char/wick/PreloadWickSprite";
import WickAnimations from "./addons/char/wick/WickAnimations";
import { wickBulletFire } from "./addons/char/wick/actions/wickBulletFire";
import { bulletTime } from "./addons/char/samurai/actions/bulletTime";
import PreloadCrowSprite from "./addons/char/crow/PreloadCrowSprite";
import CrowAnimations from "./addons/char/crow/CrowAnimations";
import PreloadCatSprite from "./addons/char/cat/PreloadCatSprite";
import CatAnimations from "./addons/char/cat/CatAnimations";

const bulletSpeed = { value: -2400 };
let nextBulletTime = 0;
const minInterval = 3000;
const maxInterval = 6000;

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
    this.data.set("wickLife", 4);
    this.data.set("playerLife", 4);
    this.data.set("isBulletTime", false);
    this.data.set("isCoolDown", false);
    this.data.set("attackAround", 0.1);
    this.data.set("aimOn", false);
    this.data.set("wickBulletFireComplete", true);
    this.data.set("isPlayerHitBullet", false);
    this.data.set("combo", 0);
    this.data.set("samuraiAttackAngle", "up");
  }

  preload() {
    // Load map
    new PreloadMap(this);
    new PreloadSamuraiSprite(this);
    new PreloadShooterSprite(this);
    new PreloadWickSprite(this);
    new PreloadCrowSprite(this);
    new PreloadCatSprite(this);
    new PreloadSound(this);
  }

  create() {
    const mainBgm = this.data.get("mainBgm");
    mainBgm.once(Phaser.Sound.Events.COMPLETE, () => {
      playRendomBgm(this);
    });

    // Add Sound
    new AddSound(this);

    // Add Map image
    new AddMap(this);

    new CrowAnimations(this);
    new CatAnimations(this);
    //player

    this.data.set("score", 0);
    this.add
      .text(25, 230, "", {
        fontSize: "24px",
        color: "cyan",
        fontFamily: "InfiniteFont",
      })
      .setName("scoreText");

    // player init
    const player = this.physics.add
      .sprite(100, 640, `samurai_idle`)
      .setName("player")
      .setScale(2);
    this.data.set("player", player);
    this.data.set("playerMoveState", "idle");

    const lifeText = this.add
      .text(30, 140, "", {
        fontSize: "24px",
        color: "red",
        fontFamily: "InfiniteFont",
      })
      .setName("scoreText");

    const samuraiLifeBar = this.add
      .image(210, 157, "samurai_life_4")
      .setScale(2.5, 2);
    this.data.set("samuraiLifeBar", samuraiLifeBar);
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
      bulletTime(this, player);
    });

    new BulletTimeProgressBar(this);
    setTimeout(() => {
      const eyeOfRoninText = this.data.get("eyeOfRoninText");
      eyeOfRoninText.setText("eye of ronin");
      const scoreText: any = this.children.getByName("scoreText");
      scoreText.setText("Score: " + this.data.get("score"));
      lifeText.setText("LIFE");
    }, 100);

    const comboText = this.add.text(950, 185, ``, {
      fontSize: "32px",
      fontFamily: "InfiniteFont", // CSS에서 정의한 font-family 이름 사용
      color: "cyan",
    });

    this.data.set("comboText", comboText);
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
    const samuraiIdleAnimation = this.data.get("samuraiIdleAnimation");
    const attackAround = this.data.get("attackAround");
    const playerMoveState = this.data.get("playerMoveState");
    const shooterMoveState = this.data.get("shooterMoveState");
    const wickMoveState = this.data.get("wickMoveState");
    const isWickTime = this.data.get("isWickTime");
    const successHit = this.data.get("successHit");
    const isBulletDestroy = this.data.get("isBulletDestroy");
    const bullet = this.data.get("bulletParticle");
    const wick = this.data.get("wick");
    const wickBulletFireComplete = this.data.get("wickBulletFireComplete");
    const isPlayerHitBullet = this.data.get("isPlayerHitBullet");
    const playerLife = this.data.get("playerLife");

    if (bulletTimeProgressBarWidth <= 0) {
      this.data.set("isBulletTime", false);
    }

    if (isBulletTime) {
      const bullet = this.data.get("bulletParticle");

      if (bullet && bullet.body?.velocity?.x && !successHit) {
        bullet.setVelocityX(bulletSpeed.value * 0.1);
      }

      attackAnimation.frameRate = 5;

      player.setTint(0x802080);
      shooter.setTint(0x404040);
      background.setTint(0x404040);

      if (bulletTimeProgressBarWidth <= 0) {
        this.data.set("isBulletTime", false);
      }
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
      if (bulletTimeProgressBarWidth <= 0) {
        this.data.set("isBulletTime", false);
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

      if (isWickTime && !successHit && !isBulletDestroy) {
        bullet.setVelocityX(bulletSpeed.value);
      }

      if (bullet && bullet.body?.velocity?.x && !isWickTime) {
        bullet.setVelocityX(bulletSpeed.value);
      }

      attackAnimation.frameRate = 60;

      player.clearTint();
      shooter.clearTint();
      background.clearTint();
    }

    if (
      playerMoveState === "idle" &&
      samuraiIdleAnimation.frameRate === 3 &&
      !isBulletTime
    ) {
      player.anims.stop();
      samuraiIdleAnimation.frameRate = 10;
      player.anims.play("samurai_idle", true);
    }

    if (playerMoveState === "attack") {
      if (isPlayerHitBullet) {
        player.body.setSize(40, 60);
        return;
      }

      player.body.setSize(player.width * attackAround, player.height * 0.4);

      if (isBulletTime && player.body.offset.x < 68) {
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

    if (shooter && !isWickTime) {
      const currentTime = this.time.now;
      if (currentTime > nextBulletTime && shooterMoveState === "idle") {
        nextBulletTime = currentTime + bulletInterval;
        autoBulletFire(shooter, this, bulletSpeed);
      }
    }

    if (isWickTime) {
      const currentTime = this.time.now;
      if (
        currentTime > nextBulletTime &&
        wickMoveState === "idle" &&
        isBulletDestroy &&
        wickBulletFireComplete
      ) {
        nextBulletTime = currentTime + bulletInterval;

        wickBulletFire(this, bulletSpeed);
        this.data.set("wickBulletFireComplete", false);
      }
    }
    if (bullet) {
      if (bullet.x > 1300 && bullet.body?.velocity?.x) {
        bullet.destroy();
        this.data.set("isBulletDestroy", true);
        this.data.set("successHit", false);
      }
    }

    if (bullet) {
      if (bullet.x < 0 && bullet.body?.velocity?.x) {
        console.log("work");
        bullet.destroy();
        this.data.set("isBulletDestroy", true);
        this.data.set("successHit", false);
        this.data.set("isCrouchBullet", false);
      }
    }

    if (isPlayerHitBullet && playerLife > 0) {
      player.anims.play("samurai_hit", true);

      player.isSwordOut = false;
      this.data.set("attackAround", 0.1);
      player.body.setSize(40, 60);
      this.data.set("isBulletDestroy", true);
      this.data.set("successHit", false);
      this.data.set("isPlayerHitBullet", false);
    }
  }
}
