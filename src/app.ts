import "phaser";
import { AssetLoader } from "./components/AssetLoader";
import { BackgroundType, BirdType, PipeType } from "./enums";
import { Background } from "./components/Background";
import { ASSET_CONFIG } from "./constants";
import Pipe from "./components/Pipe";
import Bird from "./components/Bird";

export default class GameScene extends Phaser.Scene {
  background: Background;
  bird: Bird;
  pipes: Pipe[] = [];

  constructor() {
    super({ key: "GameScene" });
    this.background = new Background(this, ASSET_CONFIG.backgroundType);
    this.bird = new Bird(this, ASSET_CONFIG.birdType);
  }

  preload() {
    AssetLoader.loadAssets(this, ASSET_CONFIG);
  }

  create() {
    this.background.render();
    this.bird.render();
  }
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
