import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
let enterText = "";

const LETTERS = [
  { key: "a", value: "akey" },
  { key: "b", value: "bkey" },
  { key: "c", value: "ckey" },
  { key: "d", value: "dkey" },
  { key: "e", value: "ekey" },
  { key: "f", value: "fkey" },
  { key: "g", value: "gkey" },
  { key: "h", value: "hkey" },
  { key: "i", value: "ikey" },
  { key: "j", value: "jkey" },
  { key: "k", value: "kkey" },
  { key: "l", value: "lkey" },
  { key: "m", value: "mkey" },
];

const LETTERS2 = [
  { key: "n", value: "nkey" },
  { key: "o", value: "okey" },
  { key: "p", value: "pkey" },
  { key: "q", value: "qkey" },
  { key: "r", value: "rkey" },
  { key: "s", value: "skey" },
  { key: "t", value: "tkey" },
  { key: "u", value: "ukey" },
  { key: "v", value: "vkey" },
  { key: "w", value: "wkey" },
  { key: "x", value: "xkey" },
  { key: "y", value: "ykey" },
  { key: "z", value: "zkey" },
];

export default class EnterRankScene extends Phaser.Scene {
  constructor() {
    super("enterRankScene");
  }

  init(data: any) {
    const score = data.score;
    this.data.set("score", score);
    this.data.set("gameoverBgm", data.bgm);
  }

  preload() {
    this.load.audio("main_bgm_2", "asset/sound/main_bgm2.mp3");
    LETTERS.forEach((letter) => {
      this.load.spritesheet(letter.key, `asset/ranking/${letter.value}.png`, {
        frameWidth: 32,
        frameHeight: 32,
      });
    });
    LETTERS2.forEach((letter) => {
      this.load.spritesheet(letter.key, `asset/ranking/${letter.value}.png`, {
        frameWidth: 32,
        frameHeight: 32,
      });
    });

    this.load.spritesheet("focus", `asset/ranking/focusBox.png`, {
      frameWidth: 32,
      frameHeight: 35,
    });

    this.load.spritesheet("esc", `asset/ranking/Esc-Key.png`, {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    const bgm2: any = this.sound.add("main_bgm_2");
    this.anims.create({
      key: "focus_box",

      frames: this.anims.generateFrameNumbers("focus", {
        start: 0,
        end: 3,
      }),

      frameRate: 10,

      repeat: -1,
    });
    LETTERS.forEach((letter) => {
      this.anims.create({
        key: letter.key,

        frames: this.anims.generateFrameNumbers(letter.key, {
          start: 0,
          end: 1,
        }),

        frameRate: 20,

        repeat: 0,
      });
    });
    LETTERS2.forEach((letter) => {
      this.anims.create({
        key: letter.key,

        frames: this.anims.generateFrameNumbers(letter.key, {
          start: 0,
          end: 1,
        }),

        frameRate: 20,

        repeat: 0,
      });
    });

    LETTERS.forEach((letter, index) => {
      this.physics.add.sprite(150 + index * 70, 300, letter.key).setScale(2);
    });
    LETTERS2.forEach((letter, index) => {
      this.physics.add.sprite(150 + index * 70, 400, letter.key).setScale(2);
    });
    this.physics.add.sprite(150, 500, "esc").setScale(2);
    const screenWidth = this.cameras.main.width;
    const score = this.data.get("score");
    const text = this.add.text(screenWidth / 2, 600, `Your Score:${score}`, {
      fontSize: "64px",
      align: "center", // 텍스트를 가운데 정렬
      fontFamily: "InfiniteFont",
      color: "cyan",
    });
    const text2 = this.add.text(screenWidth / 2, 150, `Enter Your Name`, {
      fontSize: "64px",
      align: "center", // 텍스트를 가운데 정렬
      fontFamily: "InfiniteFont",
      color: "red",
    });
    text.setOrigin(0.5);
    text2.setOrigin(0.5);
    const focusBox = this.physics.add.sprite(150, 300, "focus").setScale(3);
    focusBox.anims.play("focus_box", true);

    this.input.keyboard.on("keydown-LEFT", () => {
      if (focusBox.x !== 150 && focusBox.y !== 500) {
        focusBox.x = focusBox.x - 70;
      }
    });
    this.input.keyboard.on("keydown-RIGHT", () => {
      if (focusBox.x !== 990 && focusBox.y !== 500) {
        focusBox.x = focusBox.x + 70;
      }
    });
    this.input.keyboard.on("keydown-UP", () => {
      if (focusBox.y === 400) {
        focusBox.y = focusBox.y - 100;
      }

      if (focusBox.y === 500 && focusBox.x === 150) {
        focusBox.y = focusBox.y - 100;
      }
    });
    this.input.keyboard.on("keydown-DOWN", () => {
      if (focusBox.y === 400 && focusBox.x === 150) {
        focusBox.y = focusBox.y + 100;
      }
      if (focusBox.y === 300) {
        focusBox.y = focusBox.y + 100;
      }
    });

    const textValue = this.add.text(screenWidth / 2, 225, "", {
      fontSize: "38px",
      fontFamily: "InfiniteFont",
      color: "cyan",
    });

    const pressEnterText = this.add.text(screenWidth / 2, 260, "", {
      fontSize: "12px",
      fontFamily: "InfiniteFont",
      color: "cyan",
    });
    textValue.setOrigin(0.5);

    pressEnterText.setOrigin(0.5);

    this.data.set("pressEnterText", pressEnterText);
    this.input.keyboard.on("keydown-SPACE", () => {
      if (focusBox.x === 150 && focusBox.y === 500) {
        enterText = enterText.slice(0, -1);
        textValue.setText(enterText);

        return;
      }

      const focusBoxIndexX = Math.floor((focusBox.x - 150) / 70);
      const focusBoxIndexY =
        focusBox.y === 300 ? focusBoxIndexX : focusBoxIndexX + LETTERS.length;

      let focusBoxSpriteKey = null;

      if (focusBoxIndexY >= 0 && focusBoxIndexY < LETTERS.length) {
        focusBoxSpriteKey = LETTERS[focusBoxIndexY].key;
      } else if (
        focusBoxIndexY >= LETTERS.length &&
        focusBoxIndexY < LETTERS.length + LETTERS2.length
      ) {
        focusBoxSpriteKey = LETTERS2[focusBoxIndexY - LETTERS.length].key;
      }

      if (focusBoxSpriteKey !== null) {
        if (enterText.length < 3) {
          enterText = enterText + focusBoxSpriteKey;
          textValue.setText(enterText.toUpperCase());
        }
      }
    });
    this.input.keyboard.on("keydown-ENTER", () => {
      if (enterText.length === 3) {
        addDoc(collection(db, "ranking"), {
          score,
          name: enterText.toUpperCase(),
        }).then((result) => {
          const gameoverBgm = this.data.get("gameoverBgm");
          gameoverBgm.stop();
          this.cameras.main.fadeOut(1000, 0, 0, 0);
        });
      }
    });

    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      () => {
        this.time.delayedCall(1000, () => {
          this.scene.start("gameStartScene", {
            fadeIn: true,
            bgm2,
          });
        });
      }
    );
  }

  update() {
    const pressEnterText = this.data.get("pressEnterText");
    if (enterText.length === 3) {
      pressEnterText.setText("Press Enter");
    }

    if (enterText.length < 3) {
      pressEnterText.setText("");
    }
  }
}
