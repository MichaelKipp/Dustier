class Particle {
  constructor(location, id) {
    this.location = location;
    this.id = id;
    this.color = color(255, (this.location.x / width) * 255, (this.location.y / height) * 255);
    this.velocity = createVector(0, 0);
    this.acceleration;
    this.currentCell = grid.getCellFromPosition(this.location);
    this.active = false;
  }

  activate() { this.active = true; }

  deactivate() { this.active = false; }

  setColor(r, g, b) { this.color = color(r, g, b); }

  setColor(r, g, b, a) { this.color = color(r, g, b, a); }

  attract() { this.velocity.add(mouseX - this.location.x, mouseY - this.location.y); }

  updateNoBorder(x, y) {
    //Check proximity to mouse
    if (dist(x, y, this.location.x, this.location.y) < BLAST_RADIUS) {
      this.velocity.add(createVector(this.location.x - x, this.location.y - y));
      this.active = true;
    }

    //Move and change color
    this.setColor(255, (this.location.x / width) * 255, (this.location.y / height) * 255);
    this.velocity.mult(DRAG);
    this.velocity.limit(TOP_SPEED);
    this.location.add(this.velocity);
    this.borderCheck();

    if (this.velocity.mag() == 0) {
      this.deactivate();
    }

    this.updateCurrentCell()
  }

  updateBorder(x, y) {
    //Check proximity to mouse
    if (dist(x, y, this.location.x, this.location.y) < BLAST_RADIUS) {
      this.velocity.add(createVector(this.location.x - x, this.location.y - y));
      this.active = true;
    }

    //Move and change color
    this.setColor(255, (this.location.x / width) * 255, (this.location.y / height) * 255);
    this.velocity.mult(DRAG);
    this.velocity.limit(TOP_SPEED);
    this.location.add(this.velocity);
    this.borderCheck();

    if (this.velocity.mag() == 0) {
      this.deactivate();
    }

    this.updateCurrentCell();
  }

  updateCurrentCell() {
    if (this.currentCell != grid.getCellFromPosition(this.location)) {
      let currentCell = grid.cells[this.currentCell];
      currentCell.elements[this.id % CELL_HASH_SIZE].remove(this.id);
      if (currentCell.lastEntry === this) {
        currentCell.lastEntry = null;
      }
      this.currentCell = grid.getCellFromPosition(this.location);
      grid.cells[this.currentCell].elements[this.id % CELL_HASH_SIZE].push(this);

      // If last entry is in a new cell, it needs to be removed from the old cell
      grid.cells[this.currentCell].lastEntry = this;
    }
  }

  borderCheck() {
    if (this.location.x > width) {
      this.location.x = width - 1;
      this.velocity.x = this.velocity.x * -1
    } 
    if (this.location.x < 0) {
      this.location.x = 1;
      this.velocity.x = this.velocity.x * -1
    }
    if (this.location.y > height) {
      this.location.y = height - 1;
      this.velocity.y = this.velocity.y * -1
    }
    if (this.location.y < 0) {
      this.location.y = 1;
      this.velocity.y = this.velocity.y * -1
    }
  }

  display() {
    stroke(this.color);
    fill(this.color);
    point(this.location.x, this.location.y);
  }
}
