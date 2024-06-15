import { NUMBERS } from "../constants";
import { BirdMovement } from "../enums";
import { AssetConfig } from "../types";

export class AssetLoader {
  static loadAssets(scene: Phaser.Scene, assetConfig: AssetConfig) {
    this.loadSprites(scene, assetConfig);
    this.loadAudio(scene);
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
    scene.load.image(
      "base",
      `assets/sprites/base.png`,
    );
  }
  private static loadAudio(scene: Phaser.Scene) {}
}
