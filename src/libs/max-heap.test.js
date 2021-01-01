const MaxHeap = require('./max-heap')

describe('max-heap', () => {
  const maxHeap = new MaxHeap();
  const inputs = [1, 8, 2, 4, 7, 9, 5];
  beforeEach(() => {
    maxHeap.reset();
    inputs.forEach(input => maxHeap.insert(input))
  })
  test('push', () => {
    expect(maxHeap.count).toBe(inputs.length)
    expect(maxHeap.heap[1]).toBe(9);
  })

  test('pop', () => {
    const poped = maxHeap.pop();
    const expectResult = 9;
    expect(poped).toBe(expectResult);
    expect(maxHeap.heap[1]).toBe(8)
  })
})