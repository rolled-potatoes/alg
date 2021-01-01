const MAX_VALUE = 1000000001;

class SegmentTree {
  constructor(a) {
    this.tree = [];
    this.target = a;
  }
  initTree() {
    this.setTree(0, 0, this.target.length - 1);
  }
  setTree(position, left, right) {
    if (left === right) {
      this.tree[position] = this.target[left]
      return this.target[left]
    }
    const mid = (left + right) >> 1;
    const leftNode = this.setTree(position * 2 + 1, left, mid);
    const rightNode = this.setTree(position * 2 + 2, mid + 1, right);

    this.tree[position] = Math.min(leftNode, rightNode);
    return this.tree[position];
  }
  getMin(start, end, left, right, position) {
    if (left > end || right < start) return MAX_VALUE;

    if (left >= start && right <= end) return this.tree[position];
    const mid = (left + right) >> 1;
    const leftNode = this.getMin(start, end, left, mid, position * 2 + 1);
    const rightNode = this.getMin(start, end, mid + 1, right, position * 2 + 2);

    return Math.min(leftNode, rightNode);
  }
  find(start, end) {
    return this.getMin(start, end, 0, this.target.length - 1, 0);
  }
}


function solution(a) {
  let answer = 0;
  const segment = new SegmentTree(a);
  segment.initTree();
  a.forEach((value, idx) => {
    let cnt = 0;
    if (idx !== 0) {
      const finded = segment.find(0, idx - 1);
      if (finded <= value) cnt += 1;
    }
    if (idx !== a.length - 1) {
      const finded = segment.find(idx + 1, a.length - 1);
      if (finded <= value) cnt += 1;
    }

    if (cnt <= 1) {
      answer += 1;
    }
  })
  return answer;
}

const input = [-16, 27, 65, -2, 58, -92, -71, -68, -61, -33];
const ans = solution(input);
console.log(ans);