import { NUMBERS } from "../constants";
import { BirdMovement } from "../enums";
import { AssetConfig } from "../types";

export class AssetLoader {
  static loadAssets(scene: Phaser.Scene, assetConfig: AssetConfig) {
    this.loadSprites(scene, assetConfig);
    this.loadAudio(scene);
    this.loadCSS();
  }
  private static loadSprites(scene: Phaser.Scene, assetConfig: AssetConfig) {
    const { birdType, backgroundType, pipeType } = assetConfig;
    scene.load.image(
      "background",
      `assets/sprites/background/background-${backgroundType}.png`,
    );
    scene.load.image("pipe", `assets/sprites/pipes/pipe-${pipeType}.png`);
    scene.load.image(
      `${BirdMovement.UP_FLAP}`,
      `assets/sprites/birds/${birdType}bird-${BirdMovement.UP_FLAP}.png`,
    );
    scene.load.image(
      `${BirdMovement.MID_FLAP}`,
      `assets/sprites/birds/${birdType}bird-${BirdMovement.MID_FLAP}.png`,
    );
    scene.load.image(
      `${BirdMovement.DOWN_FLAP}`,
      `assets/sprites/birds/${birdType}bird-${BirdMovement.DOWN_FLAP}.png`,
    );
    // Common Assets
    NUMBERS.forEach((index) => {
      scene.load.image(`${index}`, `assets/sprites/numbers/${index}.png`);
    });
    scene.load.image("base", `assets/sprites/base.png`);
    scene.load.image("start-screen", `assets/sprites/start.png`);
    scene.load.image("game-over", `assets/sprites/gameover.png`);
  }
  private static loadAudio(scene: Phaser.Scene) {}
  private static loadCSS() {
    const style = document.createElement("style");
    style.innerHTML = `
      .btn {
        background-color: crimson;
        border-radius: 6px;
        border: 2px solid white;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        cursor: pointer;
        z-index: 100;
        position: absolute;
        top: ${window.innerHeight / 2 + 50}px;
        left: ${window.innerWidth / 2 - 50}px;
      }
    `;
    document.head.appendChild(style);
  }
}
