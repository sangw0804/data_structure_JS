/*
 * singleNode를 사용해 singly linked list 구현.
 */

import { SingleNode } from './node.js';
import { INDEX_OUT_OF_ORDER } from './error.js';

class SinglyLinkedList {
  // SLL 초기화 : head, tail 포인터와 length
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  size() {
    return this.length;
  }

  // SLL 에 새 노드를 맨 뒤에 삽입. SLL자신을 리턴.
  push(value) {
    const newNode = new SingleNode(value);

    if (this.length) {
      this.tail.next = newNode;
    } else {
      this.head = newNode;
    }

    this.tail = newNode;
    this.length += 1;
    return this;
  }

  // SLL 의 tail 노드를 pop 하고 그 값을 리턴.
  pop() {
    if (!this.length) return undefined;

    let before = this.head;
    while (before.next && before.next.next) {
      before = before.next;
    }

    const poppedNode = this.tail;

    this.tail = before;
    this.tail.next = null;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    }

    this.length -= 1;
    return poppedNode.value;
  }

  // SLL 의 head 노드를 pop 하고 그 값을 리턴.
  shift() {
    if (!this.length) return undefined;

    const poppedNode = this.head;
    this.head = this.head.next;
    if (this.length === 1) this.tail = null;

    this.length -= 1;
    return poppedNode.value;
  }

  // SLL 의 맨 앞에 새 노드 삽입. SLL 자신을 리턴.
  unshift(value) {
    const newNode = new SingleNode(value);
    newNode.next = this.head;
    this.head = newNode;

    if (!this.length) this.tail = newNode;

    this.length += 1;
    return this;
  }

  // SLL 의 index 위치에 새 노드 삽입. SLL 자신을 리턴.
  insert(index, value) {
    const newNode = new SingleNode(value);

    if (index > this.length || index < 0) {
      throw new Error(INDEX_OUT_OF_ORDER);
    } else if (index === this.length) {
      return this.push(value);
    } else if (!index) {
      return this.unshift(value);
    }

    let before = this.head;
    for (let i = 1; i < index; i += 1) {
      before = before.next;
    }
    newNode.next = before.next;
    before.next = newNode;

    this.length += 1;
    return this;
  }

  // SLL 의 index 위치에 있는 노드 제거 후 그 값을 리턴
  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error(INDEX_OUT_OF_ORDER);
    } else if (!index) {
      return this.shift();
    } else if (index === this.length - 1) {
      return this.pop();
    }

    let before = this.head;
    for (let i = 1; i < index; i += 1) {
      before = before.next;
    }
    const poppedNode = before.next;
    before.next = poppedNode.next;

    this.length -= 1;
    return poppedNode.value;
  }

  // SLL 을 뒤집어 head 가 tail을 가리키고, tail은 head를 가리키게 된다.
  reverse() {
    if (this.length <= 1) return this;

    let before = null;
    let current = this.head;
    let after = current.next;
    while (current) {
      current.next = before;
      before = current;
      current = after;
      if (after) after = after.next;
    }

    [this.head, this.tail] = [this.tail, this.head];

    return this;
  }
}

export { SinglyLinkedList };
