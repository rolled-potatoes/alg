class SegmentTree {
  constructor(target) {
    this.tree = [];
    this.target = target;

    this.init(0, 0, this.target.length - 1)
  }
  init(index, left, right) {
    if (left === right) {
      https://github.com/rolled-potatoes/alg
      this.tree[index] = this.target[left];
      return this.target[left];
    }

    const mid = (left + right) >> 1;
    const leftNode = this.init(index * 2 + 1, left, mid);
    const rightNode = this.init(index * 2 + 2, mid + 1, right);
    this.tree[index] = leftNode + rightNode;

    return this.tree[index]
  }

  find(rangeStart, rangeEnd) {
    return this.getRangeSum(0, 0, this.target.length - 1, rangeStart, rangeEnd);
  }
  getRangeSum(index, left, right, rangeStart, rangeEnd) {
    if (left > rangeEnd || right < rangeStart) return 0;

    if (left >= rangeStart && right <= rangeEnd) return this.tree[index];

    const mid = (left + right) >> 1;
    const leftNode = this.getRangeSum(index * 2 + 1, left, mid, rangeStart, rangeEnd)
    const rightNode = this.getRangeSum(index * 2 + 2, min + 1, right, rangeStart, rangeEnd);

    return leftNode + rightNode;
  }
}

module.exports = SegmentTree;
