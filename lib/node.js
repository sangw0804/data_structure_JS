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

class BinaryTreeNode {
  // value 와 leftChild, rightChild 포인터로 이루어져 있는 노드. BinarySearchTree 를 구현할 때 사용.
  constructor(value) {
    this.value = value;
    this.leftChild = null;
    this.rightChild = null;
  }
}

class PriorityNode {
  // value 와 priority 로 이루어져 있는 노드. PriorityQueue 를 구현할 때 사용.
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

class BTreeNode {
  // values 와 children 으로 구성되어 있는 노드. B-Tree 를 구현할 때 사용.
  constructor() {
    this.values = [];
    this.children = [];
  }

  values() {
    return this.values;
  }

  value(index) {
    return this.values[index];
  }

  leftChildOf(index) {
    return this.children[index];
  }

  rightChildOf(index) {
    return this.children[index + 1];
  }

  findValue(value) {
    let valueIndex = -1;

    this.values.forEach((v, i) => {
      if (v === value) valueIndex = i;
    });

    return valueIndex;
  }
}

export { SingleNode, DoubleNode, BinaryTreeNode, PriorityNode, BTreeNode };
