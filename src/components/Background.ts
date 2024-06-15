import { BackgroundType } from "../enums";

export class Background {
  constructor(
    public scene: Phaser.Scene,
    public type: BackgroundType,
  ) {}
  render() {
    const background = this.scene.add.image(
      this.scene.cameras.main.centerX,
      this.scene.cameras.main.centerY,
      "background",
    );
    background.setDisplaySize(window.innerWidth, window.innerHeight);
    const noOfBaseImages = window.innerWidth / 336;
    for (let i = 0; i < Math.ceil(noOfBaseImages); i++) {        
    }
    const base = this.scene.add.image(
        this.scene.cameras.main.centerX,
        this.scene.cameras.main.height - 10,
        "base",
      );
    base.setDisplaySize(window.innerWidth, 50);
  }
}
