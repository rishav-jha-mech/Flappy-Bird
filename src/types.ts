import { BackgroundType, BirdType, PipeType } from "./enums";

export type AssetConfig = {
  birdType: BirdType;
  backgroundType: BackgroundType;
  pipeType: PipeType;
};

export type GameSound =
  | Phaser.Sound.NoAudioSound
  | Phaser.Sound.HTML5AudioSound
  | Phaser.Sound.WebAudioSound;
