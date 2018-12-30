/*
 *  우선순위 큐의 구현은 힙과 거의 흡사하다. 우선순위(priority) 가 작을수록(0에 가까울수록) 우선순위가 높은 노드이다.
 */

import { PriorityNode } from './node';
import { INVALID_VALUE } from './error';

class PriorityQueue {
  constructor() {
    this.nodes = [];
  }

  size() {
    return this.nodes.length;
  }

  enqueue(value, priority) {
    if (typeof priority !== 'number') throw new Error(INVALID_VALUE);

    this.nodes.push(new PriorityNode(value, priority));
    let index = this.size() - 1;
    let parentIndex = Math.floor((index - 1) / 2);
    while (index > 0 && this.nodes[index].priority < this.nodes[parentIndex].priority) {
      [this.nodes[index], this.nodes[parentIndex]] = [this.nodes[parentIndex], this.nodes[index]];
      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
    }

    return this;
  }
}

export { PriorityQueue };
