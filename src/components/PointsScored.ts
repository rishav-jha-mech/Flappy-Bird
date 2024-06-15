export default class PointsScored {
  container!: Phaser.GameObjects.Container;

  constructor(public scene: Phaser.Scene) {}
  render() {
    const text = this.scene.add
      .sprite(this.scene.cameras.main.centerX, 50, "0")
      .setDepth(2);
    this.container = this.scene.add.container(0, 0, [text]).setDepth(2);
  }
  update(text: number) {
    const points = text.toString().split("");
    this.container.removeAll(true);
    points.forEach((point, index) => {
      this.container.add(
        this.scene.add.sprite(
          this.scene.cameras.main.centerX + index * 20,
          50,
          point,
        ),
      );
    });
  }
}
