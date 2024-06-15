import Bird from "./Bird";

export default class Pipe {
  private scene: Phaser.Scene;
  private pipes: Phaser.Physics.Arcade.Group;

  constructor(
    scene: Phaser.Scene,
    public bird: Bird,
    public incrementScore: () => void,
  ) {
    this.scene = scene;
    this.pipes = this.scene.physics.add.group();
  }

  createPipe(x: number, harndnessFactor: number, collisionOccured: () => void) {
    const gap = Phaser.Math.Between(150, 300);

    const upperPipe = this.pipes.create(
      x,
      gap,
      "pipe",
    ) as Phaser.Physics.Arcade.Sprite;
    upperPipe.flipY = true;
    upperPipe.setOrigin(0, 1);
    upperPipe.setImmovable(true);
    upperPipe.setVelocityX(-200);
    upperPipe.setDataEnabled();
    upperPipe.setData("scored", false);

    const lowerPipe = this.pipes.create(
      x,
      harndnessFactor * gap,
      "pipe",
    ) as Phaser.Physics.Arcade.Sprite;
    lowerPipe.setOrigin(0, 0);
    lowerPipe.setImmovable(true);
    lowerPipe.setVelocityX(-200);
    lowerPipe.setDataEnabled();
    lowerPipe.setData("scored", false);

    this.scene.physics.add.collider(
      this.bird.sprite,
      this.pipes,
      collisionOccured,
    );
  }

  update() {
    // @ts-ignore
    this.pipes.children.iterate((pipe: Phaser.GameObjects.GameObject) => {
      if (Phaser.Physics.Arcade.Sprite.prototype.isPrototypeOf(pipe)) {
        const pipeSprite = pipe as Phaser.Physics.Arcade.Sprite;
        if (
          !pipeSprite.getData("scored") &&
          pipeSprite.x < this.bird.sprite.x
        ) {
          pipeSprite.setData("scored", true);
          this.incrementScore();
        }
        if (pipeSprite.x + pipeSprite.width < 0) {
          pipeSprite.destroy();
        }
      }
    });
  }

  getPipes() {
    return this.pipes;
  }

  isOffScreen(): boolean {
    let offscreen = true;
    // @ts-ignore
    this.pipes.children.iterate((pipe: Phaser.GameObjects.GameObject) => {
      const pipeSprite = pipe as Phaser.Physics.Arcade.Sprite;
      if (pipeSprite.x + pipeSprite.width > 0) {
        offscreen = false;
      }
    });
    return offscreen;
  }
}
