import { Grid } from './Grid';
import { PuzzlePiece } from './PuzzlePiece';
import { clonePoint, range, shuffle } from '../util';

export class PuzzleGrid extends Grid {
  private readonly puzzlePieces: PuzzlePiece[];

  constructor() {
    super({
      rows: 3,
      cols: 3,
      x: (window.innerWidth / 2) - 300,
      y: (window.innerHeight / 2) - 300,
      height: 600,
      width: 600,
      spacing: [5, 5],
    });

    this.puzzlePieces = range(9).map((index) => new PuzzlePiece(index, index));
    do {
      shuffle(this.puzzlePieces);
      this.setItems(this.puzzlePieces);
      this.puzzlePieces.forEach((item, index) => {
        item.puzzlePosition = index;
        item.setOrigin();
        item.removeAllListeners('dragend');
        item.on('dragend', this.onPieceMoved, this);
      });
    } while (this.checkPuzzle());
  }

  onPieceMoved(piece: PuzzlePiece) {
    const collidedPiece = this.puzzlePieces
      .filter(needle => needle !== piece)
      .find(b => {
        const a = piece;
        return (
          a.x + a.width > b.x &&
          a.x < b.x + b.width &&
          a.y + a.height > b.y &&
          a.y < b.y + b.height
        );
      });

    if (collidedPiece) {
      collidedPiece.origin = clonePoint(piece.origin);
      piece.origin = clonePoint(collidedPiece);
      collidedPiece.resetPosition();

      const tmp = piece.puzzlePosition;
      piece.puzzlePosition = collidedPiece.puzzlePosition;
      collidedPiece.puzzlePosition = tmp;
      if (this.checkPuzzle()) {
        setTimeout(() => this.emit('victory'), 1000);
      }
    }

    piece.resetPosition();
  }

  checkPuzzle(): boolean {
    return this.puzzlePieces.findIndex(piece => piece.puzzlePosition !== piece.id) < 0;
  }
}

