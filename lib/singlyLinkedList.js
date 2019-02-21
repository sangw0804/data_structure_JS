import clone from '../node_modules/clone/clone.js';

import { SingleNode } from './node.js';
import { INDEX_OUT_OF_ORDER } from './error.js';

/** Singly Linked List 생성 */
class SinglyLinkedList {
  /**
   * SLL 생성
   */
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
    this.snapshots = [];
  }

  returnSnapshots() {
    const temp = this.snapshots;
    this.snapshots = [];
    return temp;
  }

  /**
   * SLL 요소 개수 리턴.
   * @return {number}
   */
  size() {
    return this.length;
  }

  /**
   * SLL의 맨 뒤에 요소 삽입.
   * @param {*} value - 삽입 할 요소
   * @param {boolean} isSnapshot
   * @return {SinglyLinkedList} - 자기 자신.
   */
  push(value, isSnapshot = false) {
    const newNode = new SingleNode(value);

    if (this.length) {
      if (isSnapshot) {
        this.tail.colored = 'blue';
        this.snapshots.push(clone(this));
        delete this.tail.colored;
      }
      this.tail.next = newNode;
    } else {
      this.head = newNode;
    }

    this.tail = newNode;
    this.length += 1;
    return this;
  }

  /**
   * SLL의 맨 뒤 요소를 빼서 리턴.
   * @param {*} isSnapshot
   * @return {*}
   */
  pop(isSnapshot = false) {
    if (!this.length) return undefined;

    let before = this.head;
    if (isSnapshot) {
      before.colored = 'blue';
      this.snapshots.push(clone(this));
      delete before.colored;
    }
    while (before.next && before.next.next) {
      before = before.next;
      if (isSnapshot) {
        before.colored = 'blue';
        this.snapshots.push(clone(this));
        delete before.colored;
      }
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

  /**
   * SLL의 맨 앞 요소를 빼서 리턴
   * @param {*} isSnapshot
   * @return {*}
   */
  shift(isSnapshot = false) {
    if (!this.length) return undefined;

    const poppedNode = this.head;
    if (isSnapshot) {
      poppedNode.colored = 'blue';
      this.snapshots.push(clone(this));
      delete poppedNode.colored;
    }
    this.head = this.head.next;
    if (this.length === 1) this.tail = null;

    this.length -= 1;
    return poppedNode.value;
  }

  /**
   * SLL의 맨 앞에 요소 삽입
   * @param {*} value - 삽입 할 요소.
   * @param {*} isSnapshot
   * @return {SinglyLinkedList} - 자기 자신
   */
  unshift(value, isSnapshot = false) {
    if (this.length && isSnapshot) {
      this.head.colored = 'blue';
      this.snapshots.push(clone(this));
      delete this.head.colored;
    }
    const newNode = new SingleNode(value);
    newNode.next = this.head;
    this.head = newNode;

    if (!this.length) this.tail = newNode;

    this.length += 1;
    return this;
  }

  /**
   * SLL 의 해당 index에 요소 삽입.
   * @param {*} index
   * @param {*} value
   * @param {*} isSnapshot
   * @throws {INDEX_OUT_OF_ORDER} index가 SLL의 범위를 벗어날 경우 예외 발생.
   * @return {SinglyLinkedList}
   */
  insert(index, value, isSnapshot = false) {
    const newNode = new SingleNode(value);

    if (index > this.length || index < 0) {
      throw new Error(INDEX_OUT_OF_ORDER);
    } else if (index === this.length) {
      return this.push(value, isSnapshot);
    } else if (!index) {
      return this.unshift(value, isSnapshot);
    }

    let before = this.head;

    if (isSnapshot) {
      before.colored = 'blue';
      this.snapshots.push(clone(this));
      delete before.colored;
    }
    for (let i = 1; i < index; i += 1) {
      before = before.next;
      if (isSnapshot) {
        before.colored = 'blue';
        this.snapshots.push(clone(this));
        delete before.colored;
      }
    }
    newNode.next = before.next;
    before.next = newNode;

    this.length += 1;
    return this;
  }

  /**
   * 해당 index 에 위치한 요소를 제거해서 리턴.
   * @param {*} index
   * @param {*} isSnapshot
   * @throws {INDEX_OUT_OF_ORDER} index가 SLL의 범위를 벗어날 경우 예외 발생.
   * @return {SinglyLinkedList}
   */
  remove(index, isSnapshot = false) {
    if (index < 0 || index >= this.length) {
      throw new Error(INDEX_OUT_OF_ORDER);
    } else if (!index) {
      return this.shift(isSnapshot);
    } else if (index === this.length - 1) {
      return this.pop(isSnapshot);
    }

    let before = this.head;
    if (isSnapshot) {
      before.colored = 'blue';
      this.snapshots.push(clone(this));
      delete before.colored;
    }
    for (let i = 1; i < index; i += 1) {
      before = before.next;
      if (isSnapshot) {
        before.colored = 'blue';
        this.snapshots.push(clone(this));
        delete before.colored;
      }
    }
    const poppedNode = before.next;
    before.next = poppedNode.next;

    this.length -= 1;
    return poppedNode.value;
  }

  /**
   * LL 을 뒤집어 head 가 tail을 가리키고, tail은 head를 가리키게 된다.
   * @return {SinglyLinkedList}
   */
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
