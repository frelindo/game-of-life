import { Void, Grass } from './struct'
import { performance } from 'perf_hooks'
import chalk from 'chalk'

export const matrix = Array.from({ length: 50 }, (v, y) =>
  Array.from({ length: 50 }, (v, x) => new Void(x, y))
)
matrix[25][25] = new Grass(25, 25)
matrix[4][34] = new Grass(34, 4)

const constructors = [Void, Grass] as const
// export const matrix = [
//   [0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 1, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0],
// ].map((a, y) => a.map((n, x) => new constructors[n](x, y)))

/** Time between frames */
export const delta = 1000 / 5
setup()

export const run = true
export function setup() {
  let now = 0
  while (run) {
    draw(performance.now() - now)
    now = performance.now()
  }
  setInterval(draw, delta)
}

function draw(delta: number) {
  console.clear()
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
  for (const e of matrix.flat()) e.do(delta)
}
