import { BinaryTreeNode } from './node.js';
import { INVALID_VALUE, EXIST_VALUE, NON_EXIST_VALUE } from './error.js';

/**
 * Binary Search Tree 클래스
 */
class BinarySearchTree {
  constructor() {
    this.root = null;
    this.length = 0;
    this.snapshots = [];
  }

  /**
   * startNode를 root 로 하는 subtree에서 가장 작은 값을 리턴한다.
   * @param {BinaryTreeNode} startNode
   * @return {number} 가장 작은 값.
   */
  _findMinimum(startNode) {
    let current = startNode;

    while (current.leftChild) {
      current = current.leftChild;
    }

    return current.value;
  }

  returnSnapshots() {
    const temp = this.snapshots;
    this.snapshots = [];
    return temp;
  }

  /**
   * 현재 BST 안에 있는 노드의 개수를 리턴한다.
   * @return {number} 노드의 개수
   */
  size() {
    return this.length;
  }

  /**
   * value 가 BST 안에 있으면 해당 node를 리턴, 없으면 false 리턴.
   * @param {number} value
   * @returns {BinaryTreeNode} 찾은 node를 리턴, value가 BST안에 없으면 false 리턴.
   */
  find(value) {
    let current = this.root;

    while (current) {
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

  /**
   * bst 에 주어진 값을 알맞은 위치에 넣는다.
   * @param {number} value
   * @throws {INVALID_VALUE} value가 number타입이 아닐 경우 예외 발생.
   * @throws {EXIST_VALUE} value가 이미 존재할 경우 예외 발생.
   * @returns {BinarySearchTree} 주어진 값이 삽입된 자기 자신 리턴.
   */
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

  /**
   * 해당 value를 찾아서 삭제한다.
   * @param {number} value
   */
  remove(value) {
    this.length -= 1;
    this.root = this._removeRecursive(this.root, value);
  }

  /**
   * 재귀적으로 remove를 구현하는 헬퍼 함수.
   * @param {BinaryTreeNode} node 지우려는 노드.
   * @param {number} value 지우려는 값.
   * @throws {NON_EXIST_VALUE} 지우려는 값이 존재하지 않으면 예외 발생.
   */
  _removeRecursive(node, value) {
    if (!node) {
      // 지우려는 value가 존재하지 않는 경우
      this.length += 1;
      throw new Error(NON_EXIST_VALUE);
    }
    if (value === node.value) {
      // 삭제할 노드를 찾음

      if (!node.leftChild && !node.rightChild) return null; // 삭제할 노드가 자식이 없는 경우

      if (!node.leftChild) return node.rightChild; // 삭제할 노드가 rightChild 만 있는 경우

      if (!node.rightChild) return node.leftChild; // 삭제할 노드가 leftChild 만 있는 경우

      // 삭제할 노드가 자식이 둘 다 있는 경우
      node.value = this._findMinimum(node.rightChild);
      node.rightChild = this._removeRecursive(node.rightChild, node.value);
      return node;
    }
    if (value < node.value) {
      // 현재 노드 값보다 찾는 값이 작은 경우
      node.leftChild = this._removeRecursive(node.leftChild, value);
      return node;
    }
    // 현재 노드 값보다 찾는 값이 큰 경우
    node.rightChild = this._removeRecursive(node.rightChild, value);
    return node;
  }

  /**
   * remove 메소드의 진행 상태를 generate 하는 제너레이터 함수.
   * @generator
   * @param {BinaryTreeNode} startNode
   * @yields {BinarySearchTree} 진행 상태가 시각적으로 표시된 자기 자신.
   * @return {number} 가장 작은 값.
   */
  *_findMinimumGen(startNode) {
    let current = startNode;

    current.colored = 'green';
    yield this;
    delete current.colored;

    while (current.leftChild) {
      current = current.leftChild;

      current.colored = 'green';
      yield this;
      delete current.colored;
    }

    return current.value;
  }

  /**
   * insert 메소드의 진행 상태를 generate 하는 제너레이터 함수.
   * @generator
   * @param {number} value
   * @throws {INVALID_VALUE} value가 number타입이 아닐 경우 예외 발생.
   * @throws {EXIST_VALUE} value가 이미 존재할 경우 예외 발생.
   * @yields {BinarySearchTree} 진행 상태가 시각적으로 표시된 자기 자신.
   * @returns {BinarySearchTree} 주어진 값이 삽입된 자기 자신 리턴.
   */
  *insertGen(value) {
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
        current.colored = 'blue';
        yield this;
        delete current.colored;

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

  /**
   * remove 메소드의 진행 상태를 generate 하는 제너레이터 함수.
   * @generator
   * @yields {BinarySearchTree} 진행 상태가 시각적으로 표시된 자기 자신.
   * @param {number} value
   */
  *removeGen(value) {
    this.length -= 1;
    this.root = yield* this._removeRecursiveGen(this.root, value);
  }

  /**
   * removeRecursive 메소드의 진행 상태를 generate 하는 제너레이터 함수.
   * @generator
   * @param {BinaryTreeNode} node 지우려는 노드.
   * @param {number} value 지우려는 값.
   * @yields {BinarySearchTree} 진행 상태가 시각적으로 표시된 자기 자신.
   * @throws {NON_EXIST_VALUE} 지우려는 값이 존재하지 않으면 예외 발생.
   */
  *_removeRecursiveGen(node, value) {
    if (!node) {
      // 지우려는 value가 존재하지 않는 경우
      this.length += 1;
      throw new Error(NON_EXIST_VALUE);
    }

    node.colored = 'blue';
    yield this;
    delete node.colored;

    if (value === node.value) {
      // 삭제할 노드를 찾음

      if (!node.leftChild && !node.rightChild) return null; // 삭제할 노드가 자식이 없는 경우

      if (!node.leftChild) return node.rightChild; // 삭제할 노드가 rightChild 만 있는 경우

      if (!node.rightChild) return node.leftChild; // 삭제할 노드가 leftChild 만 있는 경우

      // 삭제할 노드가 자식이 둘 다 있는 경우

      node.colored = 'blue';

      node.value = yield* this._findMinimumGen(node.rightChild);

      node.colored = 'green';
      yield this;
      delete node.colored;

      node.rightChild = yield* this._removeRecursiveGen(node.rightChild, node.value);
      return node;
    }
    if (value < node.value) {
      // 현재 노드 값보다 찾는 값이 작은 경우
      node.leftChild = yield* this._removeRecursiveGen(node.leftChild, value);
      return node;
    }
    // 현재 노드 값보다 찾는 값이 큰 경우
    node.rightChild = yield* this._removeRecursiveGen(node.rightChild, value);
    return node;
  }
}

export { BinarySearchTree };
