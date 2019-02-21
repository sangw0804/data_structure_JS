import { SingleNode } from './node.js';

/** Queue 클래스 생성 */
class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * 현재 Queue의 요소 개수를 리턴한다.
   * @return {number}
   */
  size() {
    return this.length;
  }

  /**
   * value 로 새 노드를 만들어 tail에 삽입한다.
   * @param {*} value
   * @return {Queue} 자기 자신을 리턴.
   */
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

  /**
   * head 노드를 pop 해서 그 값을 리턴한다.
   * @return {*}
   */
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
