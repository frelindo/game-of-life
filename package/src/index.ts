import os from 'os'
import Square from './structures/Square'

console.log(`The operating system is ${os.platform}`)

const square = new Square(10)
console.log(`Area: ${square.area}`)
