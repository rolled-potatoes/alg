const readLine = require("readline")

const readLineInterface = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
})

const inputs = [];

readLineInterface.on('line', (line) => {
  inputs.push(line);
})

readLineInterface.on('close', () => {
  const parsed = parseInputs();
  run({ ...parsed });
  process.exit();
})

function parseInputs() {
  const exchangeInt = (char) => +char;

  const splited = inputs.map(input => {
    return input.split(' ').map(exchangeInt)
  })

  const N = splited[0][0];
  const K = splited[0][1];
  const juwelryInfos = splited.slice(1, N + 1).map(ju => ({ weight: ju[0], price: ju[1] }));
  const backpacks = splited.slice(N + 1).map(x => x[0]);
  return {
    N, K, juwelryInfos, backpacks
  }
}
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------

class PriorityQueue {
  constructor() {
    this.heap = [];
    this.count = 0;
  }
  isEmpty() {
    return this.count === 0
  }

  insert(weight, price) {
    const node = new Node(weight, price);
    this.count += 1;

    let currentNode = this.count;
    let parentNode = currentNode >> 1;

    while (parentNode >= 1) {
      if (this.heap[parentNode].price >= price) break;

      this.heap[currentNode] = this.heap[parentNode]
      currentNode = parentNode;
      parentNode = currentNode >> 1;
    }
    this.heap[currentNode] = node;
  }

  delete() {
    if (this.isEmpty())
      return;

    const deleteNode = this.heap[1];
    this.heap[1] = this.heap[this.count];
    const tempNode = this.heap.pop();
    this.count -= 1;

    if (this.isEmpty()) return deleteNode;

    let currentNode = 1;
    let childNode = currentNode << 1;

    while (childNode <= this.count) {
      if (childNode + 1 <= this.count) {
        if (this.heap[childNode].price <= this.heap[childNode + 1].price)
          childNode += 1;
      }

      if (tempNode.price >= this.heap[childNode].price) break;

      this.heap[currentNode] = this.heap[childNode];
      currentNode = childNode;
      childNode <<= 1;
    }
    this.heap[currentNode] = tempNode;
    return deleteNode;
  }
}

class Node {
  constructor(weight, price) {
    this.weight = weight
    this.price = price
  }
}

function run({ N, K, juwelryInfos, backpacks }) {
  const sortInputs = () => {
    juwelryInfos.sort((a, b) => a.weight - b.weight);
    backpacks.sort((a, b) => a - b);
  }
  let juwelryIndex = 0;
  let total = 0;
  const priorityQueue = new PriorityQueue();

  const insertQueue = (weight) => {
    while (juwelryIndex < N && weight >= juwelryInfos[juwelryIndex].weight) {
      priorityQueue.insert(juwelryInfos[juwelryIndex].weight, juwelryInfos[juwelryIndex].price)
      juwelryIndex += 1;
    }
  }
  const iteratBackpack = () => {
    backpacks.forEach(backpack => {
      insertQueue(backpack);
      if (!priorityQueue.isEmpty()) {
        const poped = priorityQueue.delete();
        total += poped.price
      }
    })
  }

  sortInputs();
  iteratBackpack();
  console.log(total);
}