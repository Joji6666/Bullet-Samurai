import { jump } from "./actions/jump";
import { slash } from "./actions/slash";

export default class SamuraiAnimations {
  constructor(scene: any, player: any) {
    scene.anims.create({
      key: "eye_of_ronin_aura",

      frames: scene.anims.generateFrameNumbers(`eye_of_ronin_aura`, {
        start: 0,
        end: 3,
      }),

      frameRate: 20,

      repeat: -1,
    });

    const attackAnimation = scene.anims.create({
      key: "samurai_attack",

      frames: scene.anims.generateFrameNumbers(`samurai_attack`, {
        start: 0,
        end: 5,
      }),

      frameRate: 60,

      repeat: 0,
    });

    scene.data.set("attackAnimation", attackAnimation);

    const samuraiIdleAnimation = (scene.samuraiIdleAnimation =
      scene.anims.create({
        key: "samurai_idle",

        frames: scene.anims.generateFrameNumbers(`samurai_idle`, {
          start: 0,
          end: 7,
        }),

        frameRate: 10,

        repeat: -1,
      }));

    scene.data.set("samuraiIdleAnimation", samuraiIdleAnimation);

    scene.samuraiIdleAnimation = scene.anims.create({
      key: "samurai_hit",

      frames: scene.anims.generateFrameNumbers(`samurai_hit`, {
        start: 0,
        end: 3,
      }),

      frameRate: 10,

      repeat: 0,
    });

    scene.anims.create({
      key: "samurai_death",

      frames: scene.anims.generateFrameNumbers(`samurai_death`, {
        start: 0,
        end: 5,
      }),

      frameRate: 10,

      repeat: 0,
    });

    scene.anims.create({
      key: "samurai_jump",

      frames: scene.anims.generateFrameNumbers(`samurai_jump`, {
        start: 0,
        end: 1,
      }),

      frameRate: 10,

      repeat: 0,
    });

    scene.anims.create({
      key: "samurai_fall",

      frames: scene.anims.generateFrameNumbers(`samurai_fall`, {
        start: 0,
        end: 1,
      }),

      frameRate: 30,

      repeat: -1,
    });

    scene.anims.create({
      key: "slash_hit",

      frames: scene.anims.generateFrameNumbers(`slash_hit`, {
        start: 0,
        end: 3,
      }),

      frameRate: 20,

      repeat: 0,
    });

    scene.anims.create({
      key: "blooding",

      frames: scene.anims.generateFrameNumbers(`samurai_blood`, {
        start: 0,
        end: 27,
      }),

      frameRate: 60,

      repeat: 0,
    });

    scene.anims.create({
      key: "eye_of_ronin",

      frames: scene.anims.generateFrameNumbers(`eye_of_ronin`, {
        start: 0,
        end: 13,
      }),

      frameRate: 20,

      repeat: -1,
    });

    player.anims.play("samurai_idle", true);

    scene.input.keyboard.on("keydown-SPACE", () => {
      slash(scene, player);
    });

    scene.input.keyboard.on("keydown-UP", () => {
      scene.data.set("samuraiAttackAngle", "up");
    });
    scene.input.keyboard.on("keydown-DOWN", () => {
      scene.data.set("samuraiAttackAngle", "down");
    });
    scene.input.keyboard.on("keydown-X", () => {
      const isCoolDown = scene.data.get("isCoolDown");
      if (!isCoolDown) {
        jump(scene, player);
      }
    });
  }
}
