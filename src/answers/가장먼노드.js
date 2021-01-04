class Node {
  constructor(position) {
    this.position = position;
    this.next = [];
  }
}

function solution(n, edge) {
  const dist = new Array(n).fill(0);
  const head = new Array(n).fill(0).map((n, i) => new Node(i))
  edge.map((eg) => {
    const start = eg[0] - 1;
    const end = eg[1] - 1;
    head[start].next.push(end);
    head[end].next.push(start);
  })

  let que = head[0].next.map(n => ({ start: 0, end: n }))
  dist[0] = 1;

  while (que.length !== 0) {
    const { start, end } = que.shift();
    if (dist[end] !== 0) continue;
    dist[end] = dist[start] + 1;
    const { next } = head[end];
    for (let i = 0; i < next.length; i++) {
      que.push({ start: end, end: next[i] })
    }
  }
  const max = Math.max(...dist);
  return dist.filter(x => x === max).length
}