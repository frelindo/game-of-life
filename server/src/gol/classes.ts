import { matrix } from '.'

export namespace Void {
  export interface Options {
    color?: number
    range?: number
  }
}

export class Void {
  x: number
  y: number
  color: number

  constructor(x: number, y: number, options?: { color: number }) {
    this.x = x
    this.y = y
    this.color = options?.color ?? 0x333333
  }

  do() {}
}

export class Grass extends Void {
  spreading: number
  interval: number

  constructor(
    x: number,
    y: number,
    options?: { color?: number; interval?: number }
  ) {
    super(x, y, {
      color: 0x00ff00,
      ...options,
    })
    this.spreading = 0
    this.interval = options?.interval ?? 1
  }

  getNeighbours(size: number) {
    return Array.from(
      { length: size ** 2 },
      (v, k) => matrix[Math.floor(this.y + k / size)][this.x + (k % size)]
    )
  }

  do() {
    this.spreading++
    if (this.spreading % this.interval != 0) return

    for (const neighbour of this.getNeighbours(3)) {
      matrix[neighbour.y][neighbour.x] = new (this.constructor as typeof Grass)(
        neighbour.x,
        neighbour.y
      )
    }
  }
}
