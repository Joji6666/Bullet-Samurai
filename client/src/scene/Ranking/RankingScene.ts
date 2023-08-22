import {
  collection,
  getFirestore,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";

let rankingData: any[] = [];
let rankingTexts: Phaser.GameObjects.Text[] = []; // 텍스트 객체들을 저장할 배열

export default class RankingScene extends Phaser.Scene {
  constructor() {
    super("rankingScene");
  }

  async init() {
    const q = query(collection(db, "ranking"), orderBy("score", "desc"));
    const querySnapshot = await getDocs(q);
    rankingData = querySnapshot.docs;
  }

  preload() {
    this.load.image("back_buildings", "asset/background/back_buildings.png");
    this.load.image("far_buildings", "asset/background/far_buildings.png");
  }

  create() {
    const screenWidth = this.cameras.main.width;

    this.add.image(screenWidth / 2, 400, "far_buildings").setScale(5);
    this.add.image(screenWidth / 2, 400, "back_buildings").setScale(5);
    const rankingSceneTitle = this.add.text(screenWidth / 2, 50, "", {
      fontSize: "64px",
      color: "red",
      fontFamily: "InfiniteFont",
    });
    for (let i = 0; i < 10; i++) {
      const yPosition = 100 + i * 50;
      const rankingText = this.add.text(100, yPosition, "", {
        fontSize: "24px",
        color: "cyan",
        fontFamily: "InfiniteFont",
      });
      rankingTexts.push(rankingText);
    }

    const text = this.add.text(screenWidth / 2, 600, "", {
      fontSize: "32px",
      color: "cyan",
      fontFamily: "InfiniteFont",
    });

    text.setOrigin(0.5);

    setTimeout(() => {
      text.setText("Press Space to Continue");
      rankingSceneTitle.setText("RANKING");
    }, 200);
    rankingSceneTitle.setOrigin(0.5);

    this.input.keyboard.on("keydown-SPACE", () => {
      this.cameras.main.fadeOut(1000, 0, 0, 0);
    });

    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      () => {
        this.time.delayedCall(1000, () => {
          this.scene.start("gameStartScene", {
            fadeIn: true,
          });
        });
      }
    );
  }

  update() {
    if (rankingData.length > 0) {
      rankingData.forEach((data, index) => {
        if (index < rankingTexts.length) {
          const rankingText = rankingTexts[index];
          rankingText.setText(
            `${index + 1}. ${data.data().name}. ${data.data().score}`
          );
        }
      });
    }
  }
}
