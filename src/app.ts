import "phaser";
import { AssetLoader } from "./components/AssetLoader";
import { BackgroundType, BirdType, PipeType } from "./enums";
import { Background } from "./components/Background";
import { ASSET_CONFIG } from "./constants";

export default class GameScene extends Phaser.Scene {
  background!: Background;
  pipe!: Background;

  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    AssetLoader.loadAssets(this, ASSET_CONFIG);
  }

  create() {}
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  parent: "game",
  scene: [GameScene],
};

new Phaser.Game(config);
