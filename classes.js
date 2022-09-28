class Entity { // empty
    constructor(pos, maincol='white', subcol=undefined, range=0) {
        this.pos = pos;
        this.color = maincol;
        this.maincol = maincol;
        this.subcol = subcol||maincol;
        this.range = range;
        this._neighbours = Array.from(
            { length: Math.pow(this.range*2 +1, 2) },
            (_, i) => [i % (this.range*2 +1) -this.range +parseInt(this.y),
                Math.floor(i/(this.range*2 +1)) -this.range +parseInt(this.x)]
        )
    }
    
    get y() {return this.pos[0]}
    set y(y) {this.pos[0] = y}
    get x() {return this.pos[1]}
    set x(x) {this.pos[1] = x}

    get neighbours() {
        return this._neighbours.filter(([ y, x ]) => y>=0 && x>=0 && y<entities.length && x<entities[0].length && [y, x] != this.pos); // if index inside array
    }
    set neighbours(arr) {this._neighbours = arr}

    do() {}
}


class Grass extends Entity{ // spreads
    constructor(pos, maincol='forestgreen', subcol='limegreen', range=1) {super(pos, maincol, subcol, range); this.spreading=0}

    spread(interval, victim) {
        this.spreading++;
        this.color = this.maincol;
        if (this.spreading%interval != 0) return;
        
        for (let [ y, x ] of this.neighbours.filter(([ y, x ]) => entities[y][x].constructor == victim)) {
            entities[y][x] = new this.constructor([y, x]);
            entities[y][x].color = this.subcol;
        }
    }

    do() {this.spread(6, Entity)}
}


class Mower extends Entity{ // eats grass
    constructor(pos, maincol='gold', subcol='khaki', range=1) {
        super(pos, maincol, subcol, range);
        this.death = 0;
        this.spread = 0;
    }

    eat(victims, time) {
        let [y, x] = randChoice(victims);
        entities[y][x] = this;

        if (this.spread >= time) {
            this.spread = 0;
            entities[this.y][this.x] = new this.constructor([this.y,this.x]);
            this.color = this.subcol;
        } else{
            entities[this.y][this.x] = new Entity([this.y,this.x]);
        }
        this.pos = [y, x];
    }

    move(choices) {
        choices = this.neighbours.filter(([ y, x ]) => choices.includes(entities[y][x].constructor))
        if (choices.length<=0) return;

        let [y, x] = randChoice(choices);
        entities[y][x] = this;
        entities[this.y][this.x] = new Entity([this.y,this.x]);
        this.pos = [y, x];
    }

    die(time) {
        if (this.death >= time) {
            entities[this.y][this.x] = new Entity([this.y, this.x]);
        }
    }

    do(victims=[Grass], move=[Entity], eat=5, die=5) {
        victims = this.neighbours.filter(([ y, x ]) => victims.includes(entities[y][x].constructor));
        this.color = this.maincol;
        if (victims.length > 0) {
            this.spread++; this.death = 0;
            this.eat(victims, eat);
        } else {
            this.death++; this.spread = 0;
            this.move(move);
            this.die(die);
        }
    }
}


class Eater extends Mower{ // eats mowers
    constructor(pos, maincol='tomato', subcol='salmon', range=1) {super(pos, maincol, subcol, range)}

    do() {super.do([Mower], [Entity, Grass], 2, 8)}
}



class Rock extends Entity{ // simply immutable
    constructor(pos, maincol='#555', subcol='grey', range=0) {super(pos, maincol, range)}
}


class Generator extends Entity{ // generates random entities
    constructor(pos, maincol='midnightblue', subcol='steelblue', range=1) {
        super(pos, maincol, subcol, range);
        this.generating = 0;
    }
    
    gen(choices, victims, interval) {
        this.generating++;
        if (this.generating%interval != 0) {
            this.color = this.maincol;
            return;
        }

        this.color = this.subcol;

        let genArr = this.neighbours.filter(([ y, x ]) => victims.includes(entities[y][x].constructor));
        if (genArr.length == 0) return;

        let [y, x] = (genArr[Math.floor(Math.random()*genArr.length)]);
        entities[y][x] = new choices[Math.floor(Math.random()*choices.length)]([y, x]);
        entities[y][x].color = entities[y][x].subcol;
    }

    do() {this.gen([Mower, Eater], [Entity, Grass], 20)}
}