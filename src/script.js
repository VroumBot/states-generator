class Circle {
    constructor(pos, diameter, color) {
        this.pos = pos;
        this.diameter = diameter;
        this.color = color;
    }

    display() {
        stroke(0);
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.diameter, this.diameter);
    }
}

class Color {
    constructor(name, val) {
        this.name = name;
        this.val = val;
    }
}

function setup() {
    LBLUE = new Color("LIGHT_BLUE", color(74,179,183));
    BLUE = new Color("BLUE", color(45, 112, 138))
    RED = new Color("RED", color(243,98,90));
    GREY = new Color("LIGHT_GREY", color(230));

    // Create a canvas of 700 by 700 pixels
    canvasSize = createVector(700, 700);
    // Adapt to screen DPR
    canvasSize.div(window.devicePixelRatio);
    createCanvas(canvasSize.x, canvasSize.y);
    pixelDensity(1);

    // Set the background color to white
    background(GREY.val);

    // Create a slider to control the circle diameter
    radiusParagraph = createP('Bot radius:');
    radiusParagraph.position(10, canvasSize.y + 10);
    diameterInput = createInput('20', "number");
    diameterInput.size(50);
    diameterInput.position(10, canvasSize.y + 50);

    // Create a button to clear the canvas
    clearButton = createButton('Clear canvas');
    clearButton.position(canvasSize.x + 50, 80);
    clearButton.style('font-size', '30px');
    clearButton.style('width', '300px');
    clearButton.style('color', RED.val);
    clearButton.mousePressed(clearCircles);

    // Create a button to export to JSON
    changeBgButton = createButton('Export to JSON');
    changeBgButton.position(canvasSize.x + 50, 130);
    changeBgButton.style('font-size', '30px')
    changeBgButton.style('width', '300px');
    changeBgButton.style('color', BLUE.val);
    changeBgButton.mousePressed(exportStateToJSON);

    // Create input fields for the canvas size
    paragraph = createP('Canvas size (width, height):');
    paragraph.position(10, canvasSize.y + 60);
    xInput = createInput(700, "number");
    xInput.position(10, canvasSize.y + 100);
    xInput.size(50);
    xInput.input(updateCanvasSize);
    yInput = createInput(700, "number");
    yInput.position(70, canvasSize.y + 100);
    yInput.size(50);
    yInput.input(updateCanvasSize);

    // Create a button to toggle between bots and particles
    toggleCircleTypeButton = createButton('Toggle bots/particles');
    toggleCircleTypeButton.value = RED.name;
    toggleCircleTypeButton.position(canvasSize.x + 50, 30);
    toggleCircleTypeButton.mousePressed(toggleBotParticles);
    toggleCircleTypeButton.style('font-size', '30px');
    toggleCircleTypeButton.style('width', '300px');
    toggleCircleTypeButton.style('color', GREY.val);
    toggleBotParticles();

    updateCanvasSize()

    vroumBots = [];
    particles = [];
}

function draw() {
    clearCanvas();

    for (let i=0; i < vroumBots.length; i++) {
        vroumBots[i].display();
    }
    for (let i=0; i < particles.length; i++) {
        particles[i].display();
    }
}

function mousePressed() {
    if (mouseX > canvasSize.x || mouseY > canvasSize.y) { return; }

    if (mouseButton == LEFT) {  // FIXME: ugly, handle this differently
        if (toggleCircleTypeButton.value == LBLUE.name) {
            vroumBots.push(new Circle(createVector(mouseX, mouseY), diameterInput.value(), LBLUE.val));
        } else {
            particles.push(new Circle(createVector(mouseX, mouseY), 50, RED.val));
        }
    } else if (mouseButton == CENTER) {
        if (toggleCircleTypeButton.value == LBLUE.name) {
            particles.push(new Circle(createVector(mouseX, mouseY), 50, RED.val));
        } else {
            vroumBots.push(new Circle(createVector(mouseX, mouseY), diameterInput.value(), LBLUE.val));
        }
    } else {
        return;
    }
}

function clearCanvas() {
    background(GREY.val);

    // Display color meaning
    textSize(20);
    noStroke();
    fill(LBLUE.val);
    text("VroumBots", 10, 25);
    fill(RED.val);
    text("Particles", 10, 45);

    // Display credits
    textSize(10);
    fill(0);
    text("Made with ❤️ by Arthur Jacobs", 10, canvasSize.y - 10);
}

function clearCircles() {
    vroumBots.length = 0;
    particles.length = 0;
}

function updateCanvasSize() {
    canvasSize.x = int(xInput.value()) / window.devicePixelRatio;
    canvasSize.y = int(yInput.value()) / window.devicePixelRatio;

    resizeCanvas(canvasSize.x, canvasSize.y);
    clearCanvas();
}

function exportStateToJSON() {
    let exportData = {"particles": [], "robots": [], time:0.0,
    worldEnd: {x: canvasSize.x * window.devicePixelRatio - 50,y: canvasSize.y * window.devicePixelRatio - 50},
    worldOrigin: {x: -50,y: -50}
    };

    // Particles
    for (let i = 0; i < particles.length; i++) {
        let particleData = {
          explosionTimes: [],
          id: i,
          position: {
            x: round(particles[i].pos.x * window.devicePixelRatio, 1) - 50,
            y: round(particles[i].pos.y * window.devicePixelRatio, 1) - 50
          },
          radius: particles[i].diameter
        };
        exportData["particles"].push(particleData);
    }

    // Robots
    for (let i = 0; i < vroumBots.length; i++) {
        let robotData = {
          angle: round(random(0, 360), 1),
          captureAngle: round(random(0, 60), 1),
          id: i,
          leftSpeed: 0.0,
          position: {
            x: round(vroumBots[i].pos.x * window.devicePixelRatio, 1) - 50,
            y: round(vroumBots[i].pos.y * window.devicePixelRatio, 1) - 50
          },
          radius: vroumBots[i].diameter,
          rightSpeed: 0.0,
          score: 0.0
        };
        exportData["robots"].push(robotData);
    }

    // Save the JSON data to a file
    saveJSON(exportData, 'state.stat');
}

function toggleBotParticles() {
    if (toggleCircleTypeButton.value === RED.name) {
        toggleCircleTypeButton.value = LBLUE.name;
        toggleCircleTypeButton.style('background-color', LBLUE.val);
    } else {
        toggleCircleTypeButton.value = RED.name;
        toggleCircleTypeButton.style('background-color', RED.val);
    }
}
