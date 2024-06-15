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

  createPipe(x: number, y: number, collisionOccured: () => void) {
    const upperPipe = this.pipes.create(
      x,
      y,
      "pipe",
    ) as Phaser.Physics.Arcade.Sprite;
    upperPipe.flipY = true;

    const lowerPipe = this.pipes.create(
      x,
      this.scene.cameras.main.height - y,
      "pipe",
    ) as Phaser.Physics.Arcade.Sprite;

    upperPipe.setDataEnabled();
    lowerPipe.setDataEnabled();

    upperPipe.setData("scored", false);
    lowerPipe.setData("scored", false);


    upperPipe.setVelocityX(-200);
    lowerPipe.setVelocityX(-200);

    upperPipe.setImmovable(true);
    lowerPipe.setImmovable(true);

    this.scene.physics.add.collider(this.bird.sprite, this.pipes, collisionOccured);
  }

  update() {
    // @ts-ignore
    this.pipes.children.iterate((pipe: Phaser.GameObjects.GameObject) => {
      if (Phaser.Physics.Arcade.Sprite.prototype.isPrototypeOf(pipe)) {
        const pipeSprite = pipe as Phaser.Physics.Arcade.Sprite;
        if (!pipeSprite.getData("scored") && pipeSprite.x < this.bird.sprite.x) {
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
