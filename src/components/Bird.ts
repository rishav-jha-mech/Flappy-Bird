import { BirdType } from "../enums";

export default class Bird {
  constructor(
    public scene: Phaser.Scene,
    type: BirdType,
  ) {}
  render() {
    const bird = this.scene.add.image(
      40,
      this.scene.cameras.main.centerY,
      "bird-midflap",
    );
  }
}
