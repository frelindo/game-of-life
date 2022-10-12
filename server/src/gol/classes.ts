import { Pos, matrix } from '.'

export namespace Entity {
  export interface Options {
    color?: number
    range?: number
  }
}

export abstract class Entity {
  pos: Pos
  color: number

  constructor(pos: Pos, options: { color: number }) {
    this.pos = pos
    this.color = options?.color
  }

  get y() {
    return this.pos[0]
  }

  set y(y) {
    this.pos[0] = y
  }

  get x() {
    return this.pos[1]
  }

  set x(x) {
    this.pos[1] = x
  }

  abstract do(): void
}

export class Grass extends Entity {
  spreading: number
  interval: number

  constructor(pos: Pos, options?: { color?: number; interval?: number }) {
    super(pos, {
      color: 0x00ff00,
      ...options,
    })
    this.spreading = 0
    this.interval = options?.interval ?? 1
  }

  getNeighbours(range: number) {
    return Array.from(
      { length: range ** 2 },
      (v, k) => matrix[Math.floor(k / range)][k % range]
    )
  }

  do() {
    this.spreading++
    if (this.spreading % this.interval != 0) return

    for (const neighbour of this.getNeighbours(1)) {
      matrix[neighbour.y][neighbour.x] = new (this.constructor as typeof Grass)(
        neighbour.pos
      )
    }
  }
}
