const SegmentTree = require('./segment-tree');

describe('segment tree test', () => {
  test('sum all 1 to 10', () => {
    const input = Array(10).fill().map((x, idx) => idx + 1);

    const segment = new SegmentTree(input);
    const result = segment.find(0, input.length - 1);

    const expectResult = 55;
    expect(result).toBe(expectResult)
  })
  test('put', () => {
    const input = Array(10).fill().map((x, idx) => idx + 1);

    const segment = new SegmentTree(input);
    segment.put(0, 2);
    const result = segment.find(0, input.length - 1);
    const expectResult = 56;
    expect(result).toBe(expectResult)
  })
})