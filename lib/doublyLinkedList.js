import { DoubleNode } from './node.js';
import { INDEX_OUT_OF_ORDER } from './error.js';

import clone from '../node_modules/clone/clone.js';

/**
 * doubly linked list 클래스
 */
class DoublyLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  /**
   * 해당 index 에 위치한 노드를 반납.
   * @param {number} index
   * @returns {DoubleNode} 해당 노드를 리턴.
   */
  _get(index) {
    // index 의 위치에 따라서 검색 시작 노드와 방향이 달라짐.
    let [current, direction, times] =
      index > this.length / 2 ? [this.tail, 'before', this.length - index - 1] : [this.head, 'next', index];

    for (let i = 0; i < times; i += 1) {
      current = current[direction];
    }

    return current;
  }

  /**
   * DLL의 노드 개수를 구해서 리턴.
   * @returns {number}
   */
  size() {
    return this.length;
  }

  /**
   * tail 위치에 새 노드 삽입. 자기 자신을 리턴.
   * @param {*} value
   * @returns {DoublyLinkedList} 새 노드가 삽입된 자기 자신을 리턴.
   */
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

  /**
   * tail 노드를 pop 해서 그 값을 리턴.
   * @returns {*} pop된 값을 리턴.
   */
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

  /**
   * head 위치에 새 노드 삽입. 자기 자신을 리턴.
   * @param {*} value
   * @returns {DoublyLinkedList}
   */
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

  /**
   * head 노드를 pop 해서 그 값을 리턴.
   * @returns {*}
   */
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

  /**
   * 해당 index 에 새 노드를 생성해서 삽입.
   * @param {number} index
   * @param {*} value
   * @throws {INDEX_OUT_OF_ORDER} index가 현재 DLL의 범위를 벗어나면 예외 발생.
   * @returns {DoublyLinkedList}
   */
  insert(index, value) {
    if (this.length < 0 || index > this.length) throw new Error(INDEX_OUT_OF_ORDER);

    if (!index) {
      return this.unshift(value);
    }
    if (index === this.length) {
      return this.push(value);
    }

    // 삽입할 위치 의 바로 뒤 노드 찾기
    const prev = this._get(index - 1);

    const newNode = new DoubleNode(value);
    newNode.next = prev.next;
    newNode.before = prev;
    prev.next.before = newNode;
    prev.next = newNode;

    this.length += 1;
    return this;
  }

  /**
   * 해당 index 위치에 있는 노드를 pop 하고 그 값을 리턴한다.
   * @param {number} index
   * @throws {INDEX_OUT_OF_ORDER} index가 현재 DLL의 범위를 벗어나면 예외 발생.
   * @returns {*} pop된 값을 리턴한다.
   */
  remove(index) {
    if (index < 0 || index >= this.length) throw new Error(INDEX_OUT_OF_ORDER);

    if (!index) {
      return this.shift();
    }
    if (index === this.length - 1) {
      return this.pop();
    }

    // 제거할 노드 찾기
    const removedNode = this._get(index);

    removedNode.before.next = removedNode.next;
    removedNode.next.before = removedNode.before;

    this.length -= 1;
    return removedNode.value;
  }

  /**
   * dll 을 뒤집는다.
   * @returns {DoublyLinkedList} 뒤집힌 dll 객체.
   */
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

  /**
   * _get 메소드의 진행 상태를 generate 하는 제너레이터 함수.
   * @generator
   * @param {number} index
   * @yields {DoublyLinkedList} 진행 상태가 시각적으로 표시된 자기 자신.
   * @returns {DoubleNode} 해당 노드를 리턴.
   */
  *_getGen(index) {
    // index 의 위치에 따라서 검색 시작 노드와 방향이 달라짐.
    let [current, direction, times] =
      index > this.length / 2 ? [this.tail, 'before', this.length - index - 1] : [this.head, 'next', index];

    current.colored = 'blue';
    yield this;
    delete current.colored;

    for (let i = 0; i < times; i += 1) {
      current = current[direction];

      current.colored = 'blue';
      yield this;
      delete current.colored;
    }

    return current;
  }

  /**
   * push 메소드의 진행 상태를 generate 하는 제너레이터 함수.
   * @generator
   * @param {*} value
   * @yields {DoublyLinkedList} 진행 상태가 시각적으로 표시된 자기 자신.
   * @returns {DoublyLinkedList} 새 노드가 삽입된 자기 자신을 리턴.
   */
  *pushGen(value) {
    const newNode = new DoubleNode(value);

    if (!this.length) {
      this.head = newNode;
    } else {
      this.tail.colored = 'blue';
      yield this;
      delete this.tail.colored;

      this.tail.next = newNode;
      newNode.before = this.tail;
    }

    this.tail = newNode;

    this.length += 1;
    return this;
  }

  /**
   * pop 메소드의 진행 상태를 generate 하는 제너레이터 함수.
   * @generator
   * @yields {DoublyLinkedList} 진행 상태가 시각적으로 표시된 자기 자신.
   * @returns {*} pop된 값을 리턴.
   */
  *popGen() {
    if (!this.length) return undefined;

    const poppedNode = this.tail;

    poppedNode.colored = 'blue';
    yield this;
    delete poppedNode.colored;

    this.tail = this.tail.before;
    if (this.length === 1) {
      this.head = null;
    } else {
      this.tail.next = null;
    }

    this.length -= 1;
    return poppedNode.value;
  }

  /**
   * unshift 메소드의 진행 상태를 generate 하는 제너레이터 함수.
   * @generator
   * @param {*} value
   * @yields {DoublyLinkedList} 진행 상태가 시각적으로 표시된 자기 자신.
   * @returns {DoublyLinkedList}
   */
  *unshiftGen(value) {
    const newNode = new DoubleNode(value);

    if (!this.length) {
      this.tail = newNode;
    } else {
      this.head.colored = 'blue';
      yield this;
      delete this.head.colored;

      newNode.next = this.head;
      this.head.before = newNode;
    }
    this.head = newNode;

    this.length += 1;
    return this;
  }

  /**
   * shift 메소드의 진행 상태를 generate 하는 제너레이터 함수.
   * @generator
   * @yields {DoublyLinkedList} 진행 상태가 시각적으로 표시된 자기 자신.
   * @returns {*}
   */
  *shiftGen() {
    if (!this.length) return undefined;

    const poppedNode = this.head;

    poppedNode.colored = 'blue';
    yield this;
    delete poppedNode.colored;

    this.head = this.head.next;
    if (this.length === 1) {
      this.tail = null;
    } else {
      this.head.before = null;
    }

    this.length -= 1;
    return poppedNode.value;
  }

  /**
   * insert 메소드의 진행 상태를 generate 하는 제너레이터 함수.
   * @generator
   * @param {number} index
   * @param {*} value
   * @throws {INDEX_OUT_OF_ORDER} index가 현재 DLL의 범위를 벗어나면 예외 발생.
   * @yields {DoublyLinkedList} 진행 상태가 시각적으로 표시된 자기 자신.
   * @returns {DoublyLinkedList}
   */
  *insertGen(index, value) {
    if (this.length < 0 || index > this.length) throw new Error(INDEX_OUT_OF_ORDER);

    if (!index) {
      return yield* this.unshiftGen(value);
    }
    if (index === this.length) {
      return yield* this.pushGen(value);
    }

    // 삽입할 위치 의 바로 뒤 노드 찾기
    const prev = yield* this._getGen(index - 1);

    const newNode = new DoubleNode(value);
    newNode.next = prev.next;
    newNode.before = prev;
    prev.next.before = newNode;
    prev.next = newNode;

    this.length += 1;
    return this;
  }

  /**
   * remove 메소드의 진행 상태를 generate 하는 제너레이터 함수.
   * @generator
   * @param {number} index
   * @throws {INDEX_OUT_OF_ORDER} index가 현재 DLL의 범위를 벗어나면 예외 발생.
   * @yields {DoublyLinkedList} 진행 상태가 시각적으로 표시된 자기 자신.
   * @returns {*} pop된 값을 리턴한다.
   */
  *removeGen(index, isSnapshot = false) {
    if (index < 0 || index >= this.length) throw new Error(INDEX_OUT_OF_ORDER);

    if (!index) {
      return yield* this.shiftGen();
    }
    if (index === this.length - 1) {
      return yield* this.popGen();
    }

    // 제거할 노드 찾기
    const removedNode = yield* this._getGen(index);

    removedNode.before.next = removedNode.next;
    removedNode.next.before = removedNode.before;

    this.length -= 1;
    return removedNode.value;
  }
}

export { DoublyLinkedList };
