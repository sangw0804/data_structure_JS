/*
 *  B - Tree 구현
 */

import { BTreeNode } from './node.js';
import { EXIST_VALUE } from './error.js';

class BTree {
  constructor(limit) {
    this.root = null;
    this.limit = limit;
  }

  // 하나의 노드를 분할한다. 분할된 노드의 부모 노드를 리턴한다.
  _split(parent, key) {
    let current;
    if (!parent) {
      // 분할 대상 노드가 루트 노드인 경우 (부모가 없는 경우)
      current = this.root;

      const leftChildNode = new BTreeNode(this.limit);

      let i;
      for (i = 0; i < Math.floor(this.limit / 2); i += 1) {
        leftChildNode.values[i] = current.value(i);
        leftChildNode.children[i] = current.leftChildOf(i);
      }
      leftChildNode.children[i] = current.leftChildOf(i);
      leftChildNode.valueLength = Math.floor(this.limit / 2);

      const midValue = current.value(i);

      const rightChildNode = new BTreeNode(this.limit);
      let j;
      for (j = 0, i += 1; i < this.limit; i += 1, j += 1) {
        rightChildNode.values[j] = current.value(i);
        rightChildNode.children[j] = current.leftChildOf(i);
      }
      rightChildNode.children[j] = current.leftChildOf(i);
      rightChildNode.valueLength = j;

      current.clear();

      current.addValue(midValue, leftChildNode, rightChildNode);
    } else {
      // 분할 대상 노드가 루트 노드가 아닌 경우 (부모가 있는 경우)
      let i;
      for (i = 0; parent.value(i) < key; i += 1);
      current = parent.leftChildOf(i);

      let k = Math.floor(this.limit / 2);
      const midValue = current.value(k);

      const rightChildNode = new BTreeNode(this.limit);
      let j;
      for (j = 0, k += 1; k < this.limit; k += 1, j += 1) {
        rightChildNode.values[j] = current.value(k);
        rightChildNode.children[j] = current.leftChildOf(k);
      }
      rightChildNode.children[j] = current.leftChildOf(k);
      rightChildNode.valueLength = j;

      current.values.splice(Math.floor(this.limit / 2));
      current.children.splice(Math.floor(this.limit / 2) + 1);
      current.valueLength = Math.floor(this.limit / 2);

      parent.addValue(midValue, current, rightChildNode);

      current = parent;
    }

    return current;
  }

  find(value) {
    let targetNode = this.root;

    while (targetNode && targetNode.findValue(value) < 0) {
      let i;
      for (i = 0; i < targetNode.size() && targetNode.value(i) < value; i += 1);

      targetNode = targetNode.leftChildOf(i);
    }

    if (!targetNode) return false;

    return targetNode;
  }

  insert(value) {
    if (!this.root) this.root = new BTreeNode(this.limit);
    let current = this.root;
    let parent = null;

    while (current) {
      if (current.findValue(value) >= 0) throw Error(EXIST_VALUE);

      if (current.size() >= this.limit) {
        current = this._split(parent, value);
      }

      parent = current;
      let i;
      for (i = 0; i < current.size() && current.value(i) < value; i += 1);
      current = current.leftChildOf(i);
    }

    parent.addValue(value, undefined, undefined);
    return this;
  }
}

export { BTree };
