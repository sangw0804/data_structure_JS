/*
 * doubleNode를 사용해 doubly linked list 구현.
 */

import { DoubleNode } from './node';

class DoublyLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  // tail 위치에 새 노드 삽입. 자기 자신을 리턴.
  push(value) {
    const newNode = new DoubleNode(value);

    if (!this.length) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
      newNode.before = this.tail;
    }

    this.tail = newNode;

    this.length += 1;
    return this;
  }
}

export { DoublyLinkedList };
