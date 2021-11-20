class Cell {
  constructor(origin, width, height, number) {
    this.origin = origin;
    this.width = width;
    this.height = height;
    this.center = createVector(origin.x + width/2, origin.y + height/2);
    this.elements = [];
    this.number = number;
    this.active = false;
    this.lastEntry;

    for (var i = 0; i < CELL_HASH_SIZE; i++) {
      this.elements[i] = new Queue;
    }
  }

  activate() {
    this.active = true;
  }

  deactivate() {
    this.active = false;
  }

  addParticle(particle) {
    this.elements[particle.id % CELL_HASH_SIZE].push(particle);
  }

  update(x, y) {
    for (var i = 0, n = this.elements.length; i < n; i++) {
      let queue = this.elements[i];
      let cur = queue.head;
      while (cur != null) {
        cur.value.updateNoBorder(x, y);
        if (cur.value.velocity == 0) {
          cur.value.deactivate();
        }
        cur = cur.next;
      }
    }
  }

  display() {
    noStroke();
    if (lookUnderTheCovers && this.active) {
      if (this.active) {
        fill(50);
        rect(this.origin.x, this.origin.y, this.width, this.height);
      }
    } else {
      fill(0);
      rect(this.origin.x, this.origin.y, this.width, this.height);
    }

    for (var i = 0, n = this.elements.length; i < n; i++) {
      let queue = this.elements[i];
      let cur = queue.head;
      while (cur != null) {
        cur.value.display();
        cur = cur.next;
      }
    }
  }
}
