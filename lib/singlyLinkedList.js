/*
 * singleNode를 사용해 singly linked list 구현.
 */

import { SingleNode } from './node';

class SinglyLinkedList {
  // SLL 초기화 : head, tail 포인터와 length
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // SLL 에 새 노드를 맨 뒤에 삽입. O(1)
  push(value) {
    // 새 노드 value 지정하여 생성
    let tempNode = new SingleNode(value);

    // SLL에 노드가 존재하면 tail 노드가 새 노드를 가리킴
    if (this.length) this.tail.next = tempNode;
    // SLL에 노드가 존재하지 않으면 head 가 새 노드를 가리킴.
    else this.head = tempNode;

    this.tail = tempNode; // tail 이 새 노드를 가리킴
    this.length++; // length 증가
    return this;
  }
}

export { SinglyLinkedList };
