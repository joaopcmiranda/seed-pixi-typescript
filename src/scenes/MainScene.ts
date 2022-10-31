import { Container, Sprite, Text } from 'pixi.js';
import { ResourceManager } from '../app/ResourceManager';
import { PuzzleGrid } from '../entities/PuzzleGrid';

export class MainScene {

  container: Container = new Container();
  bg: Sprite = new Sprite(ResourceManager.getInstance().resources.bg.texture);

  constructor() {
    this.buildBg();
    this.buildPuzzleGrid();
  }

  buildBg() {
    this.bg.width = window.innerWidth;
    this.bg.height = window.innerHeight;
    this.container.addChild(this.bg);
  }

  private puzzleGrid = new PuzzleGrid();

  buildPuzzleGrid() {
    this.puzzleGrid.on('victory', this.onVictory, this);
    this.container.addChild(this.puzzleGrid);
  }

  onVictory() {
    this.container.removeChild(this.puzzleGrid);
    const victoryText = new Text('VICTORY!', { fill: 0x333333 });
    victoryText.anchor.set(0.5);
    victoryText.x = window.innerWidth / 2;
    victoryText.y = window.innerHeight / 2;
    this.container.addChild(victoryText);
  }
}
