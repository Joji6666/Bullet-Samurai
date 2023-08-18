import {
  collection,
  getFirestore,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../firebase";
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
    this.load.image("Hills_01", "asset/background/Hills_01.png");
    this.load.image("Hills_02", "asset/background/Hills_02.png");
    this.load.image("ranking", "asset/text/ranking.png");
  }

  create() {
    const screenWidth = this.cameras.main.width;

    this.add.image(screenWidth / 2, 350, "Hills_01").setScale(3);
    this.add.image(screenWidth / 2, 350, "Hills_02").setScale(3);
    const ranking = this.add
      .image(screenWidth / 2, 100, "ranking")
      .setScale(1.5);
    for (let i = 0; i < 10; i++) {
      const yPosition = 200 + i * 50;
      const rankingText = this.add.text(100, yPosition, "", {
        fontSize: "32px",
        color: "black",
      });
      rankingTexts.push(rankingText);
    }
  }

  update() {
    if (rankingData.length > 0) {
      rankingData.forEach((data, index) => {
        if (index < rankingTexts.length) {
          const rankingText = rankingTexts[index];
          rankingText.setText(
            `${index + 1}.${data.data().name}.${data.data().score}`
          );
        }
      });
    }
  }
}
