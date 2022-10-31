// export function range(from: number, to: number) {
//   return Array(to - from).fill(from).map((n, i) => n + i);
// }

export const range = (size: number) => Array.from(Array(size), (_, i) => i);

export const shuffle = <T>(array: Array<T>) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const clonePoint = (point: { x: number, y: number }): { x: number, y: number } => ({ x: point.x, y: point.y });
