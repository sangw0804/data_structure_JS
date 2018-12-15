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
    const tempNode = new SingleNode(value);

    // SLL에 노드가 존재하면 tail 노드가 새 노드를 가리킴
    if (this.length) this.tail.next = tempNode;
    // SLL에 노드가 존재하지 않으면 head 가 새 노드를 가리킴.
    else this.head = tempNode;

    this.tail = tempNode; // tail 이 새 노드를 가리킴
    this.length += 1; // length 증가
    return this;
  }

  // SLL 의 tail 노드를 pop 하고 그 값을 리턴. 노드가 없으면 undefined 리턴
  pop() {
    // 노드가 없으면 undefined 리턴
    if (!this.length) return undefined;

    // tail 바로 앞 노드를 찾아서 before 라고 하자.
    let before = this.head;
    // before 찾기.
    while (before.next && before.next.next) {
      before = before.next;
    }

    const poppedNode = this.tail; // tail 노드는 pop 될 것이다.

    this.tail = before; // tail 이 before 를 가리키게 한다.
    this.tail.next = null; // 새 tail 이 원래 가리키고 있는 이전 tail 을 가리키지 않게 한다.

    // SLL에 노드가 하나밖에 없다면 그 값을 리턴하고 empty SLL이 된다.
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    }

    this.length -= 1; // length 감소
    return poppedNode.value;
  }
}

export { SinglyLinkedList };
