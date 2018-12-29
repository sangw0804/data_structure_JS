/*
 *  Binary Search Tree 구현
 */

import { BinaryTreeNode } from './node';
import { INVALID_VALUE, EXIST_VALUE } from './error';

class BinarySearchTree {
  constructor() {
    this.root = null;
    this.length = 0;
  }

  size() {
    return this.length;
  }

  // bst 에 주어진 값을 알맞은 위치에 넣는다.
  insert(value) {
    // value 가 number 타입이 아니면 에러 발생.
    if (typeof value !== 'number') throw new Error(INVALID_VALUE);

    const newNode = new BinaryTreeNode(value);

    if (!this.root) {
      // 빈 bst 인 경우
      this.root = newNode;
    } else {
      // node 가 존재하는 bst 인 경우
      let current = this.root;

      while (true) {
        if (value < current.value) {
          // 현재 노드의 value > 주어진 value 인 경우
          if (current.leftChild) {
            current = current.leftChild;
          } else {
            current.leftChild = newNode;
            break;
          }
        } else if (value > current.value) {
          // 현재 노드의 value < 주어진 value 인 경우
          if (current.rightChild) {
            current = current.rightChild;
          } else {
            current.rightChild = newNode;
            break;
          }
        } else {
          // 현재 노드의 value === 주어진 value 인 경우
          throw new Error(EXIST_VALUE);
        }
      }
    }

    this.length += 1;
    return this;
  }
}

export { BinarySearchTree };
