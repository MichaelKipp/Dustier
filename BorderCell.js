class BorderCell extends Cell {
  constructor(origin, width, height, number) {
    super(origin, width, height, number);
  }

  update(x, y) {
    for (var i = 0, n = this.elements.length; i < n; i++) {
      let queue = this.elements[i];
      let cur = queue.head;
      while (cur != null) {
        cur.value.updateBorder(x, y);
        if (cur.value.velocity == 0) {
          cur.value.deactivate();
        }
        cur = cur.next;
      }
    }
  }
}
