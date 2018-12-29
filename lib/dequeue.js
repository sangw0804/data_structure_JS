/*
 *  doubleNode 를 사용하여 dequeue 구현
 */

import { DoubleNode } from './node';

class Dequeue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  size() {
    return this.length;
  }
}

export { Dequeue };
