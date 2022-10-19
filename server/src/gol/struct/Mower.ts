import { Void, Grass } from '.'

export class Mower extends Void {
  interval: number
  counter: number

  constructor(x: number, y: number, options?: Mower.Options) {
    super(x, y, options)
    this.interval = options?.interval ?? 1000
    this.counter = 0
  }

  override do(delta: number) {
    const neighbours = this.getNeighbours(1).filter((e) => e instanceof Grass)
    if (neighbours.length === 0) return
    const neighbour = neighbours[Math.floor(Math.random() * neighbours.length)]
    this.clone(neighbour.x, neighbour.y)

    this.counter += delta / this.interval
    if (this.counter < 1) return
    this.counter = 0
  }
}
export namespace Mower {
  export interface Options extends Void.Options {
    interval?: number
  }
}
