export default class Square {
  side: number

  constructor(side: number) {
    this.side = side
  }

  get area() {
    return this.side ** 2
  }
}
