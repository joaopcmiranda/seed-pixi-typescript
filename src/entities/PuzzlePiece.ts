import { InteractionEvent, Sprite } from 'pixi.js';
import { ResourceManager } from '../app/ResourceManager';
import { Tween } from '@tweenjs/tween.js';

export class PuzzlePiece extends Sprite {
  constructor(id: number, initialPosition: number) {
    super(ResourceManager.getInstance().resources['tile' + id].texture);
    this.anchor.set(0.5);
    this.scale.set(0.5);
    this.interactive = true;

    this.puzzlePosition = initialPosition;

    this.id = id;

    this.on('mouseover', () => {
      this.width = this._width + 10;
      this.height = this._height + 10;
    });
    this.on('mouseout', () => {
      this.width = this._width - 10;
      this.height = this._height - 10;
    });
    this.on('pointerdown', this.onPointerDown, this);
    this.on('pointermove', this.onPointerMove, this);
    this.on('pointerup', this.onPointerUp, this);
  }

  puzzlePosition: number;
  id: number;

  origin: { x: number, y: number } = { x: 0, y: 0 };

  setOrigin(location: { x: number, y: number } = { x: this.x, y: this.y }) {
    this.origin = { x: location.x, y: location.y };
  }

  resetPosition() {
    new Tween(this).to({ x: this.origin.x, y: this.origin.y }, 300).start();
  }

  dragging: boolean = false;
  mousePosition: { x: number, y: number } = { x: 0, y: 0 };

  setMousePosition(mousePosition: { x: number, y: number }) {
    this.mousePosition = { x: mousePosition.x, y: mousePosition.y };
  }

  private onPointerDown(e: InteractionEvent) {
    this.dragging = true;
    this.setMousePosition(e.data.global);
    this.zIndex = 1000;
  }

  private onPointerMove(e: InteractionEvent) {
    if (!this.dragging) {
      return;
    }

    const oldPosition = this.mousePosition;
    const currPosition = e.data.global;
    const offset = { x: currPosition.x - oldPosition.x, y: currPosition.y - oldPosition.y };
    this.x += offset.x;
    this.y += offset.y;
    this.setMousePosition(e.data.global);
  }

  private onPointerUp(_e: InteractionEvent) {
    this.dragging = false;
    this.emit('dragend', this);
    this.zIndex = 1;
  }
}
