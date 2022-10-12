import { Grass } from './classes'
import chalk from 'chalk'

export type Pos = [number, number]

const constructors = [Grass]

export const matrix = [
  [0, 1, 0],
  [1, 0, 1],
  [1, 2, 1],
].map((a, x) => a.map((n, y) => new constructors[n]([x, y])))

setup()

function setup() {
  setInterval(draw, 1000)
}

function draw() {
  console.clear()
  console.log(
    matrix
      .map((m) =>
        m
          .map((v) =>
            chalk.hex(`#${('000000' + v.color.toString(16)).slice(6)}`)
          )
          .join(' ')
      )
      .join('\n')
  )
}
