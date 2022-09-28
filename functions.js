function convertMatrix(types, matrix) {
    return Array.from(
        { length: matrix.length },
        (_, y) => Array.from(
            { length: matrix[0].length },
            (_, x) => new types[matrix[y][x]]([y, x])
        )
    );
}

function randMatrix(types, weights, size=32) {
    let table = [];
    for (let i in types) {
        table.push(...Array(Math.ceil(Math.pow(size, 2) * weights[i] / weights.reduce((x, y) => x + y, 0))).fill(types[i]));
    }

    return Array.from(
        { length: size },
        (_, y) => Array.from(
            { length: size },
            (_, x) => new table[Math.floor(Math.random()*table.length)]([y, x])
        )
    );
}

function logMatrix(matrix, other='') {
    console.log(
        other + '\n' +
        matrix.map((arr)=>arr.map((obj)=>`%c${obj.constructor.name[0]}`).join(' ')).join('\n'),
        ...matrix.map((arr)=>arr.map((obj)=>`color: ${obj.color}`)).flat()
    );
}

function randChoice(choices) {
    return choices[Math.floor(Math.random()*choices.length)]
}