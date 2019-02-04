/*
 * doubleNode를 사용해 doubly linked list 구현.
 */

import { DoubleNode } from './node.js';
import { INDEX_OUT_OF_ORDER } from './error.js';

import clone from '../node_modules/clone/clone.js';

class DoublyLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
    this.snapshots = [];
  }

  // 해당 index 에 위치한 노드를 반납.
  _get(index, isSnapshot = false) {
    // index 의 위치에 따라서 검색 시작 노드와 방향이 달라짐.
    let [current, direction, times] =
      index > this.length / 2 ? [this.tail, 'before', this.length - index - 1] : [this.head, 'next', index];

    if (isSnapshot) {
      current.colored = 'blue';
      this.snapshots.push(clone(this));
      delete current.colored;
    }
    for (let i = 0; i < times; i += 1) {
      current = current[direction];
      if (isSnapshot) {
        current.colored = 'blue';
        this.snapshots.push(clone(this));
        delete current.colored;
      }
    }

    return current;
  }

  returnSnapshots() {
    const temp = this.snapshots;
    this.snapshots = [];
    return temp;
  }

  size() {
    return this.length;
  }

  // tail 위치에 새 노드 삽입. 자기 자신을 리턴.
  push(value, isSnapshot = false) {
    const newNode = new DoubleNode(value);

    if (!this.length) {
      this.head = newNode;
    } else {
      if (isSnapshot) {
        this.tail.colored = 'blue';
        this.snapshots.push(clone(this));
        delete this.tail.colored;
      }
      this.tail.next = newNode;
      newNode.before = this.tail;
    }

    this.tail = newNode;

    this.length += 1;
    return this;
  }

  // tail 노드를 pop 해서 그 값을 리턴.
  pop(isSnapshot = false) {
    if (!this.length) return undefined;

    const poppedNode = this.tail;
    if (isSnapshot) {
      poppedNode.colored = 'blue';
      this.snapshots.push(clone(this));
      delete poppedNode.colored;
    }

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
  unshift(value, isSnapshot = false) {
    const newNode = new DoubleNode(value);

    if (!this.length) {
      this.tail = newNode;
    } else {
      if (isSnapshot) {
        this.head.colored = 'blue';
        this.snapshots.push(clone(this));
        delete this.head.colored;
      }
      newNode.next = this.head;
      this.head.before = newNode;
    }
    this.head = newNode;

    this.length += 1;
    return this;
  }

  // head 노드를 pop 해서 그 값을 리턴.
  shift(isSnapshot = false) {
    if (!this.length) return undefined;

    const poppedNode = this.head;
    if (isSnapshot) {
      poppedNode.colored = 'blue';
      this.snapshots.push(clone(this));
      delete poppedNode.colored;
    }

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
  insert(index, value, isSnapshot = false) {
    if (this.length < 0 || index > this.length) throw new Error(INDEX_OUT_OF_ORDER);

    if (!index) {
      return this.unshift(value, isSnapshot);
    }
    if (index === this.length) {
      return this.push(value, isSnapshot);
    }

    // 삽입할 위치 의 바로 뒤 노드 찾기
    const prev = this._get(index - 1, isSnapshot);

    const newNode = new DoubleNode(value);
    newNode.next = prev.next;
    newNode.before = prev;
    prev.next.before = newNode;
    prev.next = newNode;

    this.length += 1;
    return this;
  }

  // 해당 index 위치에 있는 노드를 pop 하고 그 값을 리턴한다.
  remove(index, isSnapshot = false) {
    if (index < 0 || index >= this.length) throw new Error(INDEX_OUT_OF_ORDER);

    if (!index) {
      return this.shift(isSnapshot);
    }
    if (index === this.length - 1) {
      return this.pop(isSnapshot);
    }

    // 제거할 노드 찾기
    const removedNode = this._get(index, isSnapshot);

    removedNode.before.next = removedNode.next;
    removedNode.next.before = removedNode.before;

    this.length -= 1;
    return removedNode.value;
  }

  // dll 을 뒤집는다.
  reverse() {
    if (this.length <= 1) return this;

    let current = this.head;
    while (current) {
      [current.next, current.before] = [current.before, current.next];
      current = current.before;
    }

    [this.head, this.tail] = [this.tail, this.head];

    return this;
  }
}

export { DoublyLinkedList };
