import { Void } from './Void'

export class Grass extends Void {
  interval: number
  counter: number

  constructor(x: number, y: number, options?: Grass.Options) {
    super(x, y, {
      color: 0x00ff00,
      ...options,
    })
    this.counter = 0
    this.interval = options?.interval ?? 1000
  }

  override do(delta: number) {
    this.counter += delta
    if (this.counter < this.interval) return
    this.counter = 0

    for (const neighbour of this.getNeighbours(1)) {
      if (neighbour instanceof this.constructor) continue
      this.clone(neighbour.x, neighbour.y)
    }
  }
}
export namespace Grass {
  export interface Options extends Void.Options {
    interval?: number
  }
}
