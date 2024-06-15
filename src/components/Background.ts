import { BackgroundType } from "../enums";

export class Background {
  private baseGroup!: Phaser.Physics.Arcade.StaticGroup;

  constructor(
    public scene: Phaser.Scene,
    public type: BackgroundType,
  ) {}

  render() {
    const noOfBackgroundImages = window.innerWidth / 288;
    const noOfBaseImages = window.innerWidth / 180;

    // Adding Background Images
    for (let i = 0; i <= Math.ceil(noOfBackgroundImages); i++) {
      const background = this.scene.add.image(
        i * 288,
        this.scene.cameras.main.centerY,
        "background",
      );
      background.setDisplaySize(288, window.innerHeight);
    }

    // Adding Base Images
    this.baseGroup = this.scene.physics.add.staticGroup();
    for (let i = 0; i < Math.ceil(noOfBaseImages); i++) {
      const base = this.baseGroup.create(
        i * 336,
        this.scene.cameras.main.height,
        "base",
      ) as Phaser.Physics.Arcade.Sprite;
      base.setDepth(1);
      base.setDisplaySize(336, 50).refreshBody();
    }
  }

  getBaseGroup() {
    return this.baseGroup;
  }
}
