class Queue {
  constructor() {
    this.head = null;
    this.tail = this.head;
  }

  push(value) {
    let newNode = new Node(value);
    if (this.head == null) {
      this.head = newNode;
      this.tail = newNode;
    } else if (this.head === this.tail) {
      this.head = newNode;
      this.head.next = this.tail;
      this.tail.previous = this.head;
    } else {
      this.head.previous = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
  }

  pop() {
    let out;
    if (this.tail == null) {
      out = null;
    } else if (this.tail === this.head) {
      out = this.tail.value;
      this.tail = null;
      this.head = null;
    } else {
      out = this.tail.value;
      this.tail.previous.next = this.tail.next;
      this.tail = this.previous;
    }
    return out;
  }

  remove(value) {
    let out = null;
    let cur = this.head;
    while(cur != null && cur.value.id != value) {
      cur = cur.next;
    }
    if (cur == null) {
      return out;
    } else if (this.head === this.tail) {
      this.tail = null;
      this.head = null;
      return out;
    } else if (cur === this.head) {
      this.head = this.head.next;
      if (this.head != null) {
        this.head.previous = null;
      }
    } else {
      cur.previous.next = cur.next;
    }
  }
}
