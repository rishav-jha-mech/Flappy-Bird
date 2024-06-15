import { GameSound } from "../types";

export class AudioHandler {
  die!: GameSound;
  hit!: GameSound;
  point!: GameSound;
  wing!: GameSound;

  constructor(public scene: Phaser.Scene) {}

  initialiseSounds() {
    this.die = this.scene.sound.add("die");
    this.hit = this.scene.sound.add("hit");
    this.point = this.scene.sound.add("point");
    this.wing = this.scene.sound.add("wing");
  }

  playDie() {
    this.die.play();
  }
  playHit() {
    this.hit.play();
  }
  playPoint() {
    this.point.play();
  }
  playWing() {
    this.wing.play();
  }
}
