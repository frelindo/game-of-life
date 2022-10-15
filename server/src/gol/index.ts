import { Void, Grass } from './classes'
import chalk from 'chalk'

export type Pos = [number, number]

const constructors = [Void, Grass] as const

export const matrix = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
].map((a, x) => a.map((n, y) => new constructors[n](x, y)))

setup()

function setup() {
  setInterval(draw, 1000)
}

function draw() {
  for (const e of matrix.flat()) e.do()

  // console.clear()
  console.log()
  console.log(
    matrix
      .map((a) =>
        a
          .map((e) =>
            chalk.hex(`#${('000000' + e.color.toString(16)).slice(-6)}`)(
              e.constructor.name[0].toUpperCase()
            )
          )
          .join(' ')
      )
      .join('\n')
  )
}
