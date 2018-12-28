/*
 * doubleNode를 사용해 doubly linked list 구현.
 */

import { DoubleNode } from './node';
import { INDEX_OUT_OF_ORDER } from './error';

class DoublyLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  size() {
    return this.length;
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

  // tail 노드를 pop 해서 그 값을 리턴.
  pop() {
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

  // head 위치에 새 노드 삽입. 자기 자신을 리턴.
  unshift(value) {
    const newNode = new DoubleNode(value);

    if (!this.length) {
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.before = newNode;
    }
    this.head = newNode;

    this.length += 1;
    return this;
  }

  // head 노드를 pop 해서 그 값을 리턴.
  shift() {
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

  // 해당 index 에 새 노드를 생성해서 삽입.
  insert(index, value) {
    if (this.length < 0 || this.index > this.length) throw new Error(INDEX_OUT_OF_ORDER);

    if (!index) {
      return this.unshift(value);
    }
    if (index === this.length) {
      return this.push(value);
    }

    // index 의 위치에 따라서 검색 시작 노드와 방향이 달라짐.
    let [current, direction, times] =
      index > this.length / 2
        ? [this.tail, 'before', this.length - index]
        : [this.head, 'next', index - 1];

    for (let i = 0; i < times; i += 1) {
      current = current[direction];
    }

    const newNode = new DoubleNode(value);
    newNode.next = current.next;
    newNode.before = current;
    current.next.before = newNode;
    current.next = newNode;

    this.length += 1;
    return this;
  }
}

export { DoublyLinkedList };
