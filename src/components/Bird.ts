import { BirdMovement } from "../enums";

export default class Bird {
  public sprite!: Phaser.Physics.Arcade.Sprite;
  initialY: number = 0;

  constructor(public scene: Phaser.Scene) {}

  render() {
    this.initialY = this.scene.cameras.main.centerY;
    this.sprite = this.scene.physics.add
      .sprite(
        this.scene.cameras.main.centerX - 50,
        this.scene.cameras.main.centerY,
        BirdMovement.MID_FLAP,
      )
      .setOrigin(0.5, 0.5);
    if (this.sprite.body) {
      this.sprite.body.gravity.y = 1000;
    }

    this.createAnimations();
    this.sprite.play("fly");
  }

  createAnimations() {
    this.scene.anims.create({
      key: "fly",
      frames: [
        { key: BirdMovement.MID_FLAP },
        { key: BirdMovement.UP_FLAP },
        { key: BirdMovement.DOWN_FLAP },
      ],
      frameRate: 10,
      repeat: -1,
    });
  }

  playDeadAnimation() {
    console.log("Game Over");
  }

  isOutOfBounds(): boolean {
    return this.sprite.y < 0;
  }

  jump() {
    this.initialY = this.sprite.y;
    this.sprite.body!.velocity.y = -350;
  }

  update() {
    // Check if the bird has reached 30 pixels above the initial position
    if (
      this.sprite.body!.velocity.y < 0 &&
      this.sprite.y <= this.initialY - 30
    ) {
      this.sprite.body!.velocity.y = 0;
      this.sprite.body!.gravity.y = 1000;
    }
  }
}
