//Design: PADU studio + Athanasios Katsougiannis
//Code: Athanasios Katsougiannis


var mic;
var amplitude;


var prevLevels = new Array(23);
var prevLevels1 = new Array(16);

function setup() {
  c = createCanvas(windowWidth, windowHeight);
  noStroke();

  rectMode(CENTER);
  colorMode(HSB);

  mic = new p5.AudioIn();
  mic.start();

  amplitude = new p5.Amplitude();
  amplitude.setInput(mic);
  amplitude.smooth(0);
}

function draw() {
  background(250, 20);
  
  var level = amplitude.getLevel();

  var horSize = 1.4*width/3;
  var verSize = height-(height/3);
  var g = width/3.5;
  var ballsH = height/30;

  var spacing = horSize/prevLevels.length;
  var w = spacing/1.2;
  var spacing1 = verSize/prevLevels1.length;
  var w1 = spacing1/1.3;

  var minHeight = 2;
  var roundness = 20;

  if (!mouseIsPressed) {
    // add new level to end of array
    prevLevels.push(level);
    prevLevels1.push(level);

    // remove first item in array
    prevLevels.splice(0, 1);
    prevLevels1.splice(0, 1);    
  }

  // loop through all the previous levels
  for (var i = 0; i < prevLevels.length; i++) {

    var x = map(i, prevLevels.length, 0, horSize, 0);
    var h = map(prevLevels[i], 0, 0.3, ballsH, 190);
    
    fill(0, 255, 255);
    
    rect(x+g, 150, w, h, 100);
    rect(x+g, height-180, w, h, 100);
  }
  
  for (var i = 0; i < prevLevels1.length; i++) {

    var x1 = map(i, prevLevels1.length, 0, verSize, 0);
    var h1 = map(prevLevels1[i], 0, 0.3, ballsH, 190);

    fill(0, 255, 255);
 
    push();
    rotate(-PI/2);
    rect(x1-height/1.25, width/3.7, w1, h1, 100);
    pop();
  }
 
}

function mousePressed() {
  if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
  getAudioContext().resume()
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
