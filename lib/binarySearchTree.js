/*
 *  Binary Search Tree 구현
 */

import { BinaryTreeNode } from './node.js';
import { INVALID_VALUE, EXIST_VALUE, NON_EXIST_VALUE } from './error.js';
import { makeSnapshot } from './helpers/makeSnapshot.js';

class BinarySearchTree {
  constructor() {
    this.root = null;
    this.length = 0;
    this.snapshots = [];
  }

  // startNode를 root 로 하는 subtree에서 가장 작은 값을 리턴한다.
  _findMinimum(startNode, isSnapshot = false) {
    let current = startNode;

    if (isSnapshot) {
      current.colored = 'green';
      this.snapshots.push(makeSnapshot(this));
      delete current.colored;
    }
    while (current.leftChild) {
      current = current.leftChild;
      if (isSnapshot) {
        current.colored = 'green';
        this.snapshots.push(makeSnapshot(this));
        delete current.colored;
      }
    }

    return current.value;
  }

  returnSnapshots() {
    const temp = this.snapshots;
    this.snapshots = [];
    return temp;
  }

  size() {
    return this.length;
  }

  // value 가 BST 안에 있으면 해당 node를 리턴, 없으면 false 리턴.
  find(value, isSnapshot = false) {
    let current = this.root;

    while (current) {
      if (isSnapshot) this.snapshots.push(makeSnapshot(this));
      if (value < current.value) {
        current = current.leftChild;
      } else if (value > current.value) {
        current = current.rightChild;
      } else {
        return current;
      }
    }

    return false;
  }

  // bst 에 주어진 값을 알맞은 위치에 넣는다.
  insert(value, isSnapshot = false) {
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
        if (isSnapshot) {
          current.colored = 'blue';
          this.snapshots.push(makeSnapshot(this));
          delete current.colored;
        }

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

  // 해당 value를 찾아서 삭제한다.
  remove(value, isSnapshot = false) {
    this.length -= 1;
    this.root = this._removeRecursive(this.root, value, isSnapshot);
  }

  _removeRecursive(node, value, isSnapshot = false) {
    if (!node) {
      // 지우려는 value가 존재하지 않는 경우
      this.length += 1;
      throw new Error(NON_EXIST_VALUE);
    }
    if (isSnapshot) {
      node.colored = 'blue';
      this.snapshots.push(makeSnapshot(this));
      delete node.colored;
    }
    if (value === node.value) {
      // 삭제할 노드를 찾음

      if (!node.leftChild && !node.rightChild) return null; // 삭제할 노드가 자식이 없는 경우

      if (!node.leftChild) return node.rightChild; // 삭제할 노드가 rightChild 만 있는 경우

      if (!node.rightChild) return node.leftChild; // 삭제할 노드가 leftChild 만 있는 경우

      // 삭제할 노드가 자식이 둘 다 있는 경우
      if (isSnapshot) {
        node.colored = 'blue';
      }
      node.value = this._findMinimum(node.rightChild, isSnapshot);
      if (isSnapshot) {
        node.colored = 'green';
        this.snapshots.push(makeSnapshot(this));
        delete node.colored;
      }
      node.rightChild = this._removeRecursive(node.rightChild, node.value, isSnapshot);
      return node;
    }
    if (value < node.value) {
      // 현재 노드 값보다 찾는 값이 작은 경우
      node.leftChild = this._removeRecursive(node.leftChild, value, isSnapshot);
      return node;
    }
    // 현재 노드 값보다 찾는 값이 큰 경우
    node.rightChild = this._removeRecursive(node.rightChild, value, isSnapshot);
    return node;
  }
}

export { BinarySearchTree };
