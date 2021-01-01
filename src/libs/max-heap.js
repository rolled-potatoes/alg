class MaxHeap {
  constructor() {
    this.heap = [];
    this.count = 0;
  }

  insert(value) {
    this.count++;
    let currentPosition = this.count;
    let parentPosition = currentPosition >> 1;

    while (parentPosition >= 1) {
      if (this.heap[parentPosition] >= value) break;

      this.heap[currentPosition] = this.heap[parentPosition];
      currentPosition = parentPosition;
      parentPosition = currentPosition >> 1;
    }

    this.heap[currentPosition] = value;
  }

  isEmpty() {
    return this.count === 0;
  }


  pop() {
    if (this.isEmpty()) return;

    const poped = this.heap[1];
    this.count -= 1;
    const lastNode = this.heap.pop();
    if (this.isEmpty()) return poped;

    this.heap[1] = lastNode;

    let currentPosition = 1;
    let childPosition = currentPosition << 1;

    while (childPosition < this.count) {
      // 자식이 두명일 때
      if (childPosition + 1 < this.count) {
        if (this.heap[childPosition] <= this.heap[childPosition + 1])
          childPosition += 1;
      }
      if (this.heap[childPosition] <= lastNode) break;

      this.heap[currentPosition] = this.heap[childPosition]
      currentPosition = childPosition;
      childPosition <<= 1;
    }

    this.heap[currentPosition] = lastNode;

    return poped;
  }

  reset() {
    this.heap = [];
    this.count = 0;
  }
}

module.exports = MaxHeap