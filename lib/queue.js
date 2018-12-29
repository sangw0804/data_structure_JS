/*
 *  singleNode를 사용해 queue 구현.
 */

import { SingleNode } from './node';

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  size() {
    return this.length;
  }
}

export { Queue };
