export default class GameUtils {
  static showStartScreen(scene: Phaser.Scene) {
    const startScreen = scene.add
      .image(
        scene.cameras.main.centerX,
        scene.cameras.main.centerY,
        "start-screen",
      )
      .setDepth(10);
    return startScreen;
  }
  static showGameOverScreen(scene: Phaser.Scene) {
    const startScreen = scene.add.image(
      scene.cameras.main.centerX,
      scene.cameras.main.centerY,
      "game-over",
    );
    return startScreen;
  }
  static showRestartButton(scene: Phaser.Scene) {
    const button = document.createElement("button");
    button.innerHTML = "Restart";
    button.className = "btn";
    button.onclick = () => {
      window.location.reload();
    };
    document.body.appendChild(button);
  }
}
