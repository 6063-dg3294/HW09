

class Agent extends c2.Point {
    constructor(x, y) {
        super(x, y);

        this.weight = random(1, 5);
        this.color = color(random(50, 180), random(30, 100), random(0, 200), 10);
    }
}

let agents = new Array(10);
let perlin = new c2.Perlin();
perlin.detail(4, .5);
//perlin.seed(0);

let row = 20;
let col = 20;

function setup() {
    createCanvas(windowWidth, windowHeight);
    // colorMode(HSL, 360, 100, 100);
    colorMode(RGB, 255, 255, 255, 100)
    // background('#cccccc');
    background(0, 10, 20)

    for (let i = 0; i < agents.length; i++) {
        let x = random(width);
        let y = random(height);
        agents[i] = new Agent(x, y);
    }
}

function paint(){
    for (let i = 0; i < agents.length; i++) {
        let next = (i+1) % agents.length;
        agents[i].rotate(.01, agents[next]);

        stroke(agents[i].color);
        strokeWeight(agents[i].weight);
        line(agents[i].x, agents[i].y, agents[next].x, agents[next].y);

        stroke('#333333');
        point(agents[i].x, agents[i].y);
    }
}

// function mousePressed() {
//     paint()
// }

// class randomBuilding {
//     constructor(name, posx, posy, width, height) {
//         this.name = name;
//         this.posx = posx;
//         this.posy = posy;
//         this.width = width;
//         this.height = height;
//     }

//     drawBuilding() {
//         fill(0);
//         rect(this.posx, this.posy, this.width, this.height);
//     }
// }


// let building1 = new randomBuilding('building1', 300, height - this.height, 100, 400);
// let building2 = new randomBuilding('building2', 200, 500, 100, 400);
// building1.drawBuilding();
// building2.drawBuilding();


let building1X = 200; // Initial x-position for building1
let building2X = 300; // Initial x-position for building2
let building1Y = 300;
let building2Y = 300;
let buildingSpeed = 3;


function draw() {
    drawPerlin();
    fill(0,0,0,20);
    noStroke();

    building1X += buildingSpeed;
    building2X += buildingSpeed;
    building1Y += buildingSpeed;
    building2Y += buildingSpeed;

    if (building1X > width) {
        building1X = -100;
    }
    if (building2X > width) {
        building2X = -100;
    }

    if (building1Y > height) {
        building1Y = -100;
    }
    if (building2Y > height) {
        building2Y = -100;
    }

    rect(building1X, building1Y, 300, 300);
    rect(building2X, height - building2Y, 300, 300);

    paint();
}


function drawPerlin(){
    let start = frameCount * .01;

    stroke('#333333');
    strokeWeight(0.5);
    for (let i=0; i<row; i++) {
        let t = norm(i, 0, row);
        let c = color(100*t + 30, 20+50*t, 10+100*t, 5);
        fill(c);
        beginShape();
        for (let j=0; j<col; j++) {
            let x = map(j, 0, col-1, 0, width);
            let y = map(i, 0, row, height/2, height/4*3)
            + (perlin.noise(start+j*.1, start+i*.04)-.5)
            * height;
            vertex(x, y);
        }
        vertex(width, height);
        vertex(0, height);
        endShape(CLOSE);
}

}