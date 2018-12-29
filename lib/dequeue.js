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

  // head 위치에 새 노드를 생성하여 삽입한다.
  pushHead(value) {
    const newNode = new DoubleNode(value);

    if (this.length) {
      this.head.before = newNode;
      newNode.next = this.head;
    } else {
      this.tail = newNode;
    }
    this.head = newNode;

    this.length += 1;
    return this;
  }

  // tail 위치에 새 노드를 생성하여 삽입한다.
  pushTail(value) {
    const newNode = new DoubleNode(value);

    if (this.length) {
      this.tail.next = newNode;
      newNode.before = this.tail;
    } else {
      this.head = newNode;
    }
    this.tail = newNode;

    this.length += 1;
    return this;
  }

  // head 노드를 pop 해서 그 값을 리턴한다.
  popHead() {
    if (!this.length) return undefined;

    const poppedNode = this.head;
    this.head = this.head.next;
    if (this.length === 1) {
      this.tail = null;
    } else {
      this.head.before = null;
    }

    this.length -= 1;
    return poppedNode.value;
  }

  // tail 노드를 pop 해서 그 값을 리턴한다.
  popTail() {
    if (!this.length) return undefined;

    const poppedNode = this.tail;
    this.tail = this.tail.before;
    if (this.length === 1) {
      this.head = null;
    } else {
      this.tail.next = null;
    }

    this.length -= 1;
    return poppedNode.value;
  }
}

export { Dequeue };
