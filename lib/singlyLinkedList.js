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
   * @return {SinglyLinkedList} - 자기 자신.
   */
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

  /**
   * SLL의 맨 뒤 요소를 빼서 리턴.
   * @return {*}
   */
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

  /**
   * SLL의 맨 앞 요소를 빼서 리턴
   * @return {*}
   */
  shift() {
    if (!this.length) return undefined;

    const poppedNode = this.head;

    this.head = this.head.next;
    if (this.length === 1) this.tail = null;

    this.length -= 1;
    return poppedNode.value;
  }

  /**
   * SLL의 맨 앞에 요소 삽입
   * @param {*} value - 삽입 할 요소.
   * @return {SinglyLinkedList} - 자기 자신
   */
  unshift(value) {
    const newNode = new SingleNode(value);
    newNode.next = this.head;
    this.head = newNode;

    if (!this.length) this.tail = newNode;

    this.length += 1;
    return this;
  }

  /**
   * SLL 의 해당 index에 요소 삽입.
   * @param {number} index
   * @param {*} value
   * @throws {INDEX_OUT_OF_ORDER} index가 SLL의 범위를 벗어날 경우 예외 발생.
   * @return {SinglyLinkedList}
   */
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

  /**
   * 해당 index 에 위치한 요소를 제거해서 리턴.
   * @param {number} index
   * @throws {INDEX_OUT_OF_ORDER} index가 SLL의 범위를 벗어날 경우 예외 발생.
   * @return {SinglyLinkedList}
   */
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

  /**
   * LL 을 뒤집어 head 가 tail을 가리키고, tail은 head를 가리키게 된다.
   * @return {SinglyLinkedList} 뒤집힌 자기 자신 리턴.
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

  /**
   * push 메소드의 진행을 generate하는 제너레이터 함수.
   * @generator
   * @param {*} value
   * @yields {SinglyLinkedList} 진행 상태가 시각적으로 표시된 SLL 객체.
   * @return {SinglyLinkedList} push가 완료된 자기 자신.
   */
  *pushGen(value) {
    const newNode = new SingleNode(value);

    if (this.length) {
      this.tail.colored = 'blue';
      yield this;
      delete this.tail.colored;

      this.tail.next = newNode;
    } else {
      this.head = newNode;
    }

    this.tail = newNode;
    this.length += 1;
    return this;
  }

  /**
   * pop 메소드의 진행을 generate하는 제너레이터 함수.
   * @generator
   * @yields {SinglyLinkedList} 진행 상태가 시각적으로 표시된 SLL 객체.
   * @return {*} pop 된 요소의 값
   */
  *popGen() {
    if (!this.length) return undefined;

    let before = this.head;

    before.colored = 'blue';
    yield this;
    delete before.colored;

    while (before.next && before.next.next) {
      before = before.next;

      before.colored = 'blue';
      yield this;
      delete before.colored;
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
   * shift 메소드의 진행을 generate하는 제너레이터 함수.
   * @generator
   * @yields {SinglyLinkedList} 진행 상태가 시각적으로 표시된 SLL 객체.
   * @return {*}
   */
  *shiftGen() {
    if (!this.length) return undefined;

    const poppedNode = this.head;

    poppedNode.colored = 'blue';
    yield this;
    delete poppedNode.colored;

    this.head = this.head.next;
    if (this.length === 1) this.tail = null;

    this.length -= 1;
    return poppedNode.value;
  }

  /**
   * unshift 메소드의 진행을 generate하는 제너레이터 함수.
   * @generator
   * @yields {SinglyLinkedList} 진행 상태가 시각적으로 표시된 SLL 객체.
   * @return {SinglyLinkedList} unshift가 완료된 자기 자신.
   */
  *unshiftGen(value) {
    if (this.length) {
      this.head.colored = 'blue';
      yield this;
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
   * insert 메소드의 진행을 generate하는 제너레이터 함수.
   * @generator
   * @param {number} index
   * @param {*} value
   * @throws {INDEX_OUT_OF_ORDER} index가 SLL의 범위를 벗어날 경우 예외 발생.
   * @return {SinglyLinkedList}
   */
  *insertGen(index, value) {
    const newNode = new SingleNode(value);

    if (index > this.length || index < 0) {
      throw new Error(INDEX_OUT_OF_ORDER);
    } else if (index === this.length) {
      return yield* this.pushGen(value);
    } else if (!index) {
      return yield* this.unshiftGen(value);
    }

    let before = this.head;

    before.colored = 'blue';
    yield this;
    delete before.colored;

    for (let i = 1; i < index; i += 1) {
      before = before.next;

      before.colored = 'blue';
      yield this;
      delete before.colored;
    }
    newNode.next = before.next;
    before.next = newNode;

    this.length += 1;
    return this;
  }

  /**
   * 해당 index 에 위치한 요소를 제거해서 리턴.
   * @param {number} index
   * @throws {INDEX_OUT_OF_ORDER} index가 SLL의 범위를 벗어날 경우 예외 발생.
   * @return {SinglyLinkedList}
   */
  *removeGen(index) {
    if (index < 0 || index >= this.length) {
      throw new Error(INDEX_OUT_OF_ORDER);
    } else if (!index) {
      return yield* this.shiftGen();
    } else if (index === this.length - 1) {
      return yield* this.popGen();
    }

    let before = this.head;

    before.colored = 'blue';
    yield this;
    delete before.colored;

    for (let i = 1; i < index; i += 1) {
      before = before.next;

      before.colored = 'blue';
      yield this;
      delete before.colored;
    }
    const poppedNode = before.next;
    before.next = poppedNode.next;

    this.length -= 1;
    return poppedNode.value;
  }
}

export { SinglyLinkedList };
