/*
 *  B - Tree 구현
 */

import { BTreeNode } from './node.js';
import { EXIST_VALUE, INVALID_VALUE, NON_EXIST_VALUE } from './error.js';

import clone from '../node_modules/clone/clone.js';

class BTree {
  constructor(limit) {
    if (typeof limit !== 'number' || limit % 2 === 0 || limit <= 1) throw new Error(INVALID_VALUE);

    this.root = null;
    this.limit = limit;
    this.size = 0;
    this.snapshots = [];
  }

  static _swap(delNode, index) {
    let subsParent = delNode;
    let subsNode = delNode.rightChildOf(index);

    while (subsNode.leftChildOf(0) && subsNode.leftChildOf(0) instanceof BTreeNode) {
      subsParent = subsNode;
      subsNode = subsParent.rightChildOf(0);
    }

    delNode.values[index] = subsNode.value(0);

    return subsNode.value(0);
  }

  // 하나의 노드를 분할한다. 분할된 노드의 부모 노드를 리턴한다.
  _split(parent, key, isSnapshot = false) {
    let current;

    if (!parent) {
      // 분할 대상 노드가 루트 노드인 경우 (부모가 없는 경우)
      current = this.root;
      if (isSnapshot) {
        const mid = Math.floor(this.limit / 2);
        current.values.forEach((v, index) => {
          if (index < mid) {
            current.valuesColor[index] = 'green';
          } else if (index === mid) {
            current.valuesColor[index] = 'blue';
          } else {
            current.valuesColor[index] = 'orange';
          }
        });
        this.snapshots.push(clone(this));

        current.valuesColor = [];
      }

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

      if (isSnapshot) {
        current.valuesColor[0] = 'blue';

        current.leftChildOf(0).values.forEach((v, index) => {
          current.leftChildOf(0).valuesColor[index] = 'green';
        });

        current.rightChildOf(0).values.forEach((v, index) => {
          current.rightChildOf(0).valuesColor[index] = 'orange';
        });

        this.snapshots.push(clone(this));

        current.valuesColor = [];
        current.leftChildOf(0).valuesColor = [];
        current.rightChildOf(0).valuesColor = [];
      }
    } else {
      // 분할 대상 노드가 루트 노드가 아닌 경우 (부모가 있는 경우)
      let i;
      for (i = 0; parent.value(i) < key; i += 1);
      current = parent.leftChildOf(i);

      if (isSnapshot) {
        const mid = Math.floor(this.limit / 2);
        current.values.forEach((v, index) => {
          if (index < mid) {
            current.valuesColor[index] = 'green';
          } else if (index === mid) {
            current.valuesColor[index] = 'blue';
          } else {
            current.valuesColor[index] = 'orange';
          }
        });
        this.snapshots.push(clone(this));

        current.valuesColor = [];
      }

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

      if (isSnapshot) {
        const pi = current.findValue(midValue);

        current.valuesColor[pi] = 'blue';

        current.leftChildOf(pi).values.forEach((v, index) => {
          current.leftChildOf(pi).valuesColor[index] = 'green';
        });

        current.rightChildOf(pi).values.forEach((v, index) => {
          current.rightChildOf(pi).valuesColor[index] = 'orange';
        });

        this.snapshots.push(clone(this));

        current.valuesColor = [];
        current.leftChildOf(pi).valuesColor = [];
        current.rightChildOf(pi).valuesColor = [];
      }
    }

    return current;
  }

  _borrowKey(parent, index) {
    let fromIndex = index + 1;
    if (index === parent.size()) fromIndex = index - 1;

    const from = parent.leftChildOf(fromIndex);
    const to = parent.leftChildOf(index);

    if (from.size() <= Math.floor(this.limit / 2)) return false;

    if (fromIndex > index) {
      // 오른쪽 형제에게 빌려오는 경우
      to.addValue(parent.value(index), null, from.leftChildOf(0));
      parent.values[index] = from.value(0);
      from.removeValue(0);
    } else {
      // 왼쪽 형제에게 빌려오는 경우
      to.addValue(parent.value(index - 1), from.leftChildOf(from.size()), null);
      parent.values[index - 1] = from.value(from.size() - 1);
      from.removeValue(from.size() - 1);
    }

    return true;
  }

  _bindNode(parent, index) {
    if (index === parent.size()) index -= 1;

    const left = parent.leftChildOf(index);
    const right = parent.rightChildOf(index);

    left.addValue(parent.value(index), null, null);
    let i;
    let j;
    for (i = 0, j = left.size(); i < right.size(); i += 1, j += 1) {
      left.values[j] = right.value(i);
      left.children[j] = right.children[i];
    }
    left.children[j] = right.children[i];
    left.valueLength = left.size() + right.size();

    parent.removeValue(index);
    parent.children[index] = left;

    // 부모 노드가 뿌리노드인 경우
    if (!parent.size()) this.root = left;

    return left;
  }

  returnSnapshots() {
    const temp = this.snapshots;
    this.snapshots = [];
    return temp;
  }

  size() {
    return this.size;
  }

  find(value, isSnapshot = false) {
    let targetNode = this.root;

    while (targetNode && targetNode.findValue(value) < 0) {
      if (isSnapshot) {
        targetNode.colored = 'blue';
        this.snapshots.push(clone(this));
        delete targetNode.colored;
      }
      let i;
      for (i = 0; i < targetNode.size() && targetNode.value(i) < value; i += 1);

      targetNode = targetNode.leftChildOf(i);
    }

    if (!targetNode) return false;

    return targetNode;
  }

  insert(value, isSnapshot = false) {
    if (!this.root) this.root = new BTreeNode(this.limit);
    let current = this.root;
    let parent = null;

    while (current) {
      if (isSnapshot) {
        current.colored = 'blue';
        this.snapshots.push(clone(this));
        delete current.colored;
      }
      if (current.findValue(value) >= 0) throw Error(EXIST_VALUE);

      if (current.size() >= this.limit) {
        current = this._split(parent, value, isSnapshot);
      }

      parent = current;
      let i;
      for (i = 0; i < current.size() && current.value(i) < value; i += 1);
      current = current.leftChildOf(i);
    }

    parent.addValue(value, undefined, undefined);
    this.size += 1;
    return this;
  }

  remove(value, isSnapshot = false) {
    let parent = null;
    let current = this.root;

    let i = 0;
    while (current) {
      if (parent && current.size() <= Math.floor(this.limit / 2)) {
        if (!this._borrowKey(parent, i)) current = this._bindNode(parent, i);
      }

      if (current.findValue(value) >= 0) {
        if (!current.leftChildOf(0)) break; // current 가 leaf 노드 인 경우
        value = BTree._swap(current, current.findValue(value)); // leaf 노드가 아니면 swap 한 다음, 다시 새로운 value를 지우는 알고리즘 실행
      }

      parent = current;

      for (i = 0; i < current.size() && current.value(i) <= value; i += 1);
      current = current.leftChildOf(i);
    }

    if (!current) throw new Error(NON_EXIST_VALUE); // break 하지 못한 경우, value를 트리에서 찾지 못한 것이므로 false 리턴.

    if (current.size() <= Math.floor(this.limit / 2)) {
      if (!this._borrowKey(parent, i)) current = this._bindNode(parent, i);
    }

    current.removeValue(current.findValue(value));
    this.size -= 1;
    return true;
  }
}

export { BTree };
