/*
 *  자료구조의 기본이 되는 노드.
 *  새로운 종류의 노드가 필요하면 이곳에서 만들어 export 할 것.
 */

class SingleNode {
  // value 와 next node 포인터로 이루어져 있는 기본적인 노드. singlyLinkedList, queue 등을 구현할 때 사용.
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class DoubleNode {
  // value 와 next \ before node 포인터로 이루어져 있는 노드. doublyLinkedList를 구현할 때 사용.
  constructor(value) {
    this.value = value;
    this.next = null;
    this.before = null;
  }
}

export { SingleNode, DoubleNode };
