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
    this.bird = new Bird(this);
  }

  preload() {
    AssetLoader.loadAssets(this, ASSET_CONFIG);
  }

  create() {
    this.background.render();
    this.bird.render();

    this.time.addEvent({
      delay: 1500,
      callback: this.addPipe,
      callbackScope: this,
      loop: true,
    });

    // Collider b/w Bird and Background Base
    this.physics.add.collider(
      this.bird.sprite,
      this.background.getBaseGroup(),
      this.gameOver,
    );

    this.input.on("pointerdown", () => {
      this.bird.jump();
    });
  }

  update() {
    if (this.bird.isOutOfBounds()) {
      this.scene.pause();
      return;
    }

    this.bird.update();
    this.pipes.forEach((pipe) => {
      pipe.update();
    });

    this.pipes = this.pipes.filter((pipe) => {
      return pipe.isOffScreen() === false;
    });
  }

  addPipe() {
    const pipeX = this.cameras.main.width;
    const pipeY = Phaser.Math.Between(-40, 100);

    const pipe = new Pipe(this);
    pipe.createPipe(pipeX, pipeY, this.bird, this.gameOver.bind(this));

    this.pipes.push(pipe);
  }

  gameOver() {
    this.scene.pause();
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  parent: "game",
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: [GameScene],
};

new Phaser.Game(config);
