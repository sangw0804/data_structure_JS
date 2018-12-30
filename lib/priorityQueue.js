/*
 *  우선순위 큐의 구현은 힙과 거의 흡사하다.
 */

import { PriorityNode } from './node';

class PriorityQueue {
  constructor() {
    this.nodes = [];
  }

  size() {
    return this.nodes.length;
  }
}

export { PriorityQueue };
