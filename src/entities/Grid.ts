import { Container } from 'pixi.js';

export class Grid extends Container {

  protected rows: number;
  protected cols: number;
  protected spacing: [number, number];

  constructor(
    {
      rows,
      cols,
      x,
      y,
      width,
      height,
      spacing,
    }: {
      rows: number,
      cols: number,
      x: number,
      y: number,
      width: number,
      height: number,
      spacing: [number, number]
    }) {
    super();
    this.rows = rows;
    this.cols = cols;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.spacing = spacing;
    this.sortableChildren = true
  }

  setItems(items: Container[]) {
    this.removeChildren();

    const hspace = this.spacing[0] * this.cols - 1;
    const vspace = this.spacing[1] * this.rows - 1;

    const w = (this._width - hspace) / this.cols;
    const h = (this._height - vspace) / this.rows;

    items.forEach((item, index) => {
      const row = Math.floor(index / this.cols);
      const col = index % this.rows;

      item.height = h - vspace;
      item.width = w - hspace;
      item.x = (col * w) - this.spacing[0];
      item.y = (row * h) - this.spacing[1];

      this.addChild(item);
    });
  }
}
