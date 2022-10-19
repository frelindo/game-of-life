import { matrix } from '..'

export class Void {
  x: number
  y: number
  color: number

  constructor(x: number, y: number, options?: Void.Options) {
    this.x = x
    this.y = y
    this.color = options?.color ?? 0x333333
  }

  do(delta: number) {}

  getNeighbours(range: number) {
    return Array.from(
      { length: (range * 2 + 1) ** 2 },
      (v, k) =>
        (matrix[this.y + Math.floor(k / (range * 2 + 1)) - range] ?? {})[
          this.x + Math.floor(k % (range * 2 + 1)) - range
        ]
    ).filter((e) => e && !(e.x === this.x && e.y === this.y))
  }

  clone(x: number, y: number) {
    matrix[y][x] = new (this.constructor as typeof Void)(x, y)
  }
}
export namespace Void {
  export interface Options {
    color?: number
  }
}
