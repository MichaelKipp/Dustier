/*
Author: Michael Kipp
Date: 10/19/2019
Project: Optimazation of Dust
*/

/*
TODO:
    Implement Cell -> borderCell heirarchy
    Add "spread" updating. After one cell activates, check surrounding cells for engagement
    Proper refreshing mechanics so that cells are activated appropriately
*/

"use strict";

var DRAG;
var NUM_PARTICLES;
var BUBBLE_SIZE;
var TOP_SPEED;
var BLAST_RADIUS;
var GRID_SIZE;
var CELL_HASH_SIZE;

var mouseHasBeenMoved;
var lookUnderTheCovers;
var lookedUnderTheCovers;

var particles;
var grid;

function setup() {
  let width = windowWidth;
  let height = windowHeight;
  createCanvas(width, height);
  textSize(32);
  textFont('Helvetica');

  DRAG = .85;
  NUM_PARTICLES = 35000;
  TOP_SPEED = 10;
  BLAST_RADIUS = 50;
  BUBBLE_SIZE = 20;
  GRID_SIZE = 50;
  CELL_HASH_SIZE = 1000;

  mouseHasBeenMoved = false;
  lookUnderTheCovers = false;
  lookedUnderTheCovers = false;

  smooth();
  background(0);

  grid = new Grid(createVector(0,0), GRID_SIZE, GRID_SIZE, width, height);
  particles = [];

  for (var i = 0; i < NUM_PARTICLES; i++) {
    let particle = new Particle(createVector(random(width), random(height)), i)
    particles.push(particle);
    grid.addParticle(particle);
  }

  for (var i = 0, n = grid.cells.length; i < n; i++) {
    grid.cells[i].display();
  }
}

function draw() {
  grid.step();
  if (!mouseHasBeenMoved) {
    noStroke();
    fill(200, .75);
    text("Move the mouse", (windowWidth * 1/5), (windowHeight/2));
  } else if (!lookedUnderTheCovers) {
    noStroke();
    fill(200, 1);
    text("Press space to see tracking", (windowWidth * 3/5), (windowHeight/2));
  }
}

function keyPressed() {
  if (keyCode == 32) {
    lookUnderTheCovers = !lookUnderTheCovers;
    lookedUnderTheCovers = true;
  }
}

function mouseMoved() {
  mouseHasBeenMoved = true;
}

function mousePressed() {
  console.log(mouseX, mouseY);
  console.log(grid.getCellFromPosition(createVector(mouseX, mouseY)));
  console.log(grid.cells[grid.getCellFromPosition(createVector(mouseX, mouseY))]);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
