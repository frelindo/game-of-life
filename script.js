let entities = randMatrix([Entity, Grass, Mower, Eater, Rock, Generator], [64, 8, 8, 8, 2, 1], 32);
// let entities = convertMatrix([Grass, Mower], [
//     [0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0],
//     [0, 0, 1, 0, 0],
//     [0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0]
// ])

// cookies
let size, side;
let fps, afps; afps = fps = 5; // max ≈ 25
let interval = 1*fps;

// update
function draw() {}

// create canvas
function setup() {
    size = Math.min(windowWidth, windowHeight)*0.97;
    side = size/entities.length;

    createCanvas(size, size);
    frameRate(fps);
    draw();
}

function draw () {
    // canvas
    strokeWeight(0.5);
    stroke('#555')
    for (let entity of entities.flat()) {
        fill(entity.color);
        rect(entity.x*side, entity.y*side, side, side);
    }

    // console
    if (frameCount%interval<1) { // update approximate fps
        console.clear();
        logMatrix(entities, `${frameCount}  /  ${Math.floor(frameRate()*100)/100} fps`);
    }

    // canvas
    fill('black');
    text(`${frameCount}  /  ${Math.floor(frameRate()*100)/100} fps`, 10, 20);
    
    // entities
    for (type of [Grass, Mower, Eater, Rock, Generator]) {
        for (let entity of entities.flat().filter((entity)=>entity.constructor == type)) {
            entity.do();
        }
    }
}

function windowResized() {
    size = Math.min(windowWidth, windowHeight)*0.97;
    side = size/entities.length;
    resizeCanvas(size, size);
}