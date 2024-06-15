import { BackgroundType, BirdType, DifficultyLevels, PipeType } from "./enums";
import { AssetConfig } from "./types";

export const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
export const ASSET_CONFIG: AssetConfig = {
  backgroundType: BackgroundType.DAY,
  birdType: BirdType.YELLOW,
  pipeType: PipeType.GREEN,
};

export const DIFFICULTY = {
  [DifficultyLevels.HARD]: 1.5,
  [DifficultyLevels.MEDIUM]: 1.75,
  [DifficultyLevels.EASY]: 2,
}