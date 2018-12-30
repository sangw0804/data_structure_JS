/*
 *  우선순위 큐의 구현은 힙과 거의 흡사하다. 우선순위(priority) 가 작을수록(0에 가까울수록) 우선순위가 높은 노드이다.
 */

import { PriorityNode } from './node.js';
import { INVALID_VALUE } from './error.js';

class PriorityQueue {
  constructor() {
    this.nodes = [];
  }

  size() {
    return this.nodes.length;
  }

  // 새로운 노드를 생성해서 큐에 삽입, 우선순위에 맞는 위치로 이동시킨다.
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

  // 우선순위가 가장 낮은 노드를 pop 해서 리턴하고, 남은 노드들을 우선순위대로 정렬한다.
  dequeue() {
    if (!this.size()) return undefined;
    if (this.size() === 1) return this.nodes.pop();
    const poppedNode = this.nodes[0];
    this.nodes[0] = this.nodes.pop();

    let index = 0;
    let childIndex = index * 2 + 1;
    while (childIndex < this.size()) {
      if (this.nodes[childIndex + 1] && this.nodes[childIndex].priority > this.nodes[childIndex + 1].priority) {
        childIndex += 1;
      }
      if (this.nodes[index].priority <= this.nodes[childIndex].priority) break;

      [this.nodes[index], this.nodes[childIndex]] = [this.nodes[childIndex], this.nodes[index]];

      index = childIndex;
      childIndex = index * 2 + 1;
    }

    return poppedNode;
  }
}

export { PriorityQueue };
