/*
  Parameters:
    x = number of columns in the grid
    y = number of rows in the grid
    width = total width of grid divided over x columns
    height = total height of grid divided over y rows
*/

class Grid {
  constructor(origin, x, y, width, height) {
    this.origin = origin;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.cells = [];
    this.cellWidth = width/x;
    this.cellHeight = height/y;

    for (var j = 0; j < x; j++) {
      for (var k = 0; k < y; k++) {
        var cell;
        if (j == 0 || j == x - 1 || k == 0 || k == y - 1) {
          cell = new BorderCell(
            createVector(origin.x + j * this.cellWidth, origin.y + k * this.cellHeight),
            this.cellWidth,
            this.cellHeight,
            k * this.x + j);
            this.cells[k * y + j] = cell;

        } else {
          cell = new Cell(
            createVector(origin.x + j * this.cellWidth, origin.y + k * this.cellHeight),
            this.cellWidth,
            this.cellHeight,
            k * this.x + j);
            this.cells[k * y + j] = cell;
        }
        this.cells[k * y + j] = cell;
      }
    }
  }

  getCellFromPosition(location) {
    return Math.floor(location.y/this.cellHeight) * this.y + Math.floor(location.x/this.cellWidth);
  }

  addParticle(particle) {
    this.cells[particle.currentCell].addParticle(particle);
  }

  step() {
    for (var i = 0, n = this.cells.length; i < n; i++) {
      let cell = this.cells[i];
      if (cell.active && cell.lastEntry == null) {
        cell.deactivate();
        cell.display();
      }
      if (collideRectCircle(cell.origin.x, cell.origin.y, cell.width, cell.height,
        mouseX, mouseY, BLAST_RADIUS * 2)) {
        cell.activate();
      }
      else if (cell.lastEntry != null) {
        if (cell.lastEntry.currentCell != cell.number) {
          cell.lastEntry = null;
          cell.deactivate();
          cell.display();
        } else {
          if (cell.lastEntry.velocity.mag() > 0.1) {
            cell.activate();
          } else {
            cell.lastEntry = null;
            cell.deactivate();
            cell.display();
          }
        }
      } 
      if (cell.active) {
        cell.update(mouseX, mouseY);
        cell.display();
      }
    }
  }
}
