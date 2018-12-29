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

  // value 로 새 노드를 만들어 tail에 삽입한다.
  enqueue(value) {
    const newNode = new SingleNode(value);

    if (!this.length) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
    }
    this.tail = newNode;

    this.length += 1;
    return this;
  }

  // head 노드를 pop 해서 그 값을 리턴한다.
  dequeue() {
    if (!this.length) return undefined;

    const poppedNode = this.head;
    this.head = this.head.next;
    if (this.length === 1) this.tail = null;

    this.length -= 1;
    return poppedNode.value;
  }
}

export { Queue };
