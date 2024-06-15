import "phaser";
import { AssetLoader } from "./components/AssetLoader";
import { Background } from "./components/Background";
import Bird from "./components/Bird";
import GameUtils from "./components/GameUtils";
import Pipe from "./components/Pipe";
import PointsScored from "./components/PointsScored";
import { ASSET_CONFIG, DIFFICULTY } from "./constants";
import { DifficultyLevels } from "./enums";
import { AudioHandler } from "./components/AudioHandler";

export default class GameScene extends Phaser.Scene {
  background: Background;
  bird: Bird;
  pipes: Pipe[] = [];
  points: number = 0;
  pointsScored: PointsScored;
  isGameStarted: boolean = false;
  difficultyLevel: DifficultyLevels = DifficultyLevels.EASY;
  pipeSpawnLevel: DifficultyLevels = DifficultyLevels.EASY;
  GameSounds: AudioHandler;

  constructor() {
    super({ key: "GameScene" });
    this.background = new Background(this, ASSET_CONFIG.backgroundType);
    this.bird = new Bird(this);
    this.pointsScored = new PointsScored(this);
    this.GameSounds = new AudioHandler(this);
  }

  preload() {
    AssetLoader.loadAssets(this, ASSET_CONFIG);
  }

  create() {
    this.background.render();
    this.GameSounds.initialiseSounds();
    const startScreen = GameUtils.showStartScreen(this);
    this.input.on("pointerdown", () => {
      if (this.isGameStarted) {
        this.bird.jump();
        this.GameSounds.playWing();
      } else {
        this.isGameStarted = true;
        startScreen.destroy();
        this.startGame();
      }
    });
  }

  startGame() {
    this.bird.render();
    this.pointsScored.render();

    this.time.addEvent({
      delay: DIFFICULTY[this.difficultyLevel] * 800,
      callback: this.addPipe,
      callbackScope: this,
      loop: true,
    });

    // Collider b/w Bird and Background Base
    this.physics.add.collider(this.bird.sprite, this.background.getBaseGroup());
  }

  update() {
    if (!this.isGameStarted) {
      return;
    }
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

    const pipe = new Pipe(this, this.bird, this.pointsUpdated.bind(this));
    pipe.createPipe(
      pipeX,
      DIFFICULTY[this.difficultyLevel],
      this.gameOver.bind(this),
    );

    this.pipes.push(pipe);
  }

  pointsUpdated() {
    this.points += 0.5;
    this.pointsScored.update(this.points);
    this.GameSounds.playPoint();
    // Level Up Logic
    if (this.points >= 10 && this.points < 20) {
      this.difficultyLevel = DifficultyLevels.MEDIUM;
      this.pipeSpawnLevel = DifficultyLevels.MEDIUM;
    } else if (this.points >= 20) {
      this.difficultyLevel = DifficultyLevels.HARD;
      this.pipeSpawnLevel = DifficultyLevels.HARD;
    }
  }

  gameOver() {
    this.GameSounds.playHit();
    GameUtils.showGameOverScreen(this);
    GameUtils.showRestartButton(this);
    this.GameSounds.playDie();
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
