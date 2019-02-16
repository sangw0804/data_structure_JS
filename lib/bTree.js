/*
 *  B - Tree 구현
 */

import { BTreeNode } from './node.js';
import { EXIST_VALUE, INVALID_VALUE, NON_EXIST_VALUE } from './error.js';

class BTree {
  constructor(limit) {
    if (typeof limit !== 'number' || limit % 2 === 0 || limit <= 1) throw new Error(INVALID_VALUE);

    this.root = null;
    this.limit = limit;
    this.size = 0;
    this.snapshots = [];
  }

  _swap(delNode, index) {
    let subsParent = delNode;
    let subsNode = delNode.rightChildOf(index);

    while (subsNode.leftChildOf(0) && subsNode.leftChildOf(0) instanceof BTreeNode) {
      subsParent = subsNode;
      subsNode = subsParent.leftChildOf(0);
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
        this.snapshots.push(JSON.parse(JSON.stringify(this)));

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

        this.snapshots.push(JSON.parse(JSON.stringify(this)));

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
        this.snapshots.push(JSON.parse(JSON.stringify(this)));

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

        this.snapshots.push(JSON.parse(JSON.stringify(this)));

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
        this.snapshots.push(JSON.parse(JSON.stringify(this)));
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
        this.snapshots.push(JSON.parse(JSON.stringify(this)));
        delete current.colored;
      }
      if (current.findValue(value) >= 0) throw Error(EXIST_VALUE);

      if (current.size() >= this.limit) {
        current = this._split(parent, value, isSnapshot);
      }

      parent = current;
      let i;
      for (i = 0; i < current.size() && current.value(i) < value; i += 1) {
        if (isSnapshot) {
          current.valuesColor[i] = 'blue';
          this.snapshots.push(JSON.parse(JSON.stringify(this)));
          current.valuesColor = [];
        }
      }
      current = current.leftChildOf(i);
    }

    parent.addValue(value, undefined, undefined);
    this.size += 1;
    return this;
  }

  remove(value) {
    let parent = null;
    let current = this.root;

    let i = 0;
    while (current) {
      if (parent && current.size() <= Math.floor(this.limit / 2)) {
        if (!this._borrowKey(parent, i)) current = this._bindNode(parent, i);
      }

      if (current.findValue(value) >= 0) {
        if (!current.leftChildOf(0)) break; // current 가 leaf 노드 인 경우
        value = this._swap(current, current.findValue(value)); // leaf 노드가 아니면 swap 한 다음, 다시 새로운 value를 지우는 알고리즘 실행
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

  *_borrowKeyGen(parent, index) {
    let fromIndex = index + 1;
    if (index === parent.size()) fromIndex = index - 1;

    const from = parent.leftChildOf(fromIndex);
    const to = parent.leftChildOf(index);

    if (from.size() <= Math.floor(this.limit / 2)) {
      return false;
    }
    yield true;

    to.colored = 'blue';
    from.colored = 'green';

    yield JSON.parse(JSON.stringify(this));

    delete to.colored;
    delete from.colored;

    if (fromIndex > index) {
      to.valuesColor[to.size() - 1] = 'blue';
      parent.valuesColor[index] = 'orange';
      from.valuesColor[0] = 'green';

      yield JSON.parse(JSON.stringify(this));

      to.valuesColor = [];
      parent.valuesColor = [];
      from.valuesColor = [];

      // 오른쪽 형제에게 빌려오는 경우
      to.addValue(parent.value(index), null, from.leftChildOf(0));
      parent.values[index] = from.value(0);
      from.removeValue(0);

      to.valuesColor[to.size() - 2] = 'blue';
      to.valuesColor[to.size() - 1] = 'orange';
      parent.valuesColor[index] = 'green';
    } else {
      to.valuesColor[0] = 'blue';
      parent.valuesColor[index - 1] = 'orange';
      from.valuesColor[from.size() - 1] = 'green';

      yield JSON.parse(JSON.stringify(this));

      to.valuesColor = [];
      parent.valuesColor = [];
      from.valuesColor = [];

      // 왼쪽 형제에게 빌려오는 경우
      to.addValue(parent.value(index - 1), from.leftChildOf(from.size()), null);
      parent.values[index - 1] = from.value(from.size() - 1);
      from.removeValue(from.size() - 1);

      to.valuesColor[1] = 'blue';
      to.valuesColor[0] = 'orange';
      parent.valuesColor[index - 1] = 'green';
    }

    const temp = JSON.parse(JSON.stringify(this));

    to.valuesColor = [];
    parent.valuesColor = [];

    return temp;
  }

  *_bindNodeGen(parent, index) {
    let isLeft = true;

    if (index === parent.size()) {
      index -= 1;
      isLeft = false;
    }

    const left = parent.leftChildOf(index);
    const right = parent.rightChildOf(index);

    left.colored = isLeft ? 'blue' : 'green';
    right.colored = isLeft ? 'green' : 'blue';
    parent.valuesColor[index] = 'orange';

    yield JSON.parse(JSON.stringify(this));

    delete left.colored;
    delete right.colored;
    parent.valuesColor = [];

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

    const mid = Math.floor(this.limit / 2);
    for (let j = 0; j < this.limit; j += 1) {
      if (j < mid) {
        left.valuesColor[j] = isLeft ? 'blue' : 'green';
      } else if (j === mid) {
        left.valuesColor[j] = 'orange';
      } else {
        left.valuesColor[j] = isLeft ? 'green' : 'blue';
      }
    }

    yield JSON.parse(JSON.stringify(this));
    left.valuesColor = [];

    return left;
  }

  *_swapGen(delNode, index) {
    let subsParent = delNode;
    let subsNode = delNode.rightChildOf(index);

    delNode.valuesColor[index] = 'blue';
    subsNode.colored = 'green';

    yield JSON.parse(JSON.stringify(this));

    delete subsNode.colored;

    while (subsNode.leftChildOf(0) && subsNode.leftChildOf(0) instanceof BTreeNode) {
      subsParent = subsNode;
      subsNode = subsParent.leftChildOf(0);

      subsNode.colored = 'green';
      yield JSON.parse(JSON.stringify(this));

      delete subsNode.colored;
    }

    subsNode.valuesColor[0] = 'green';
    yield JSON.parse(JSON.stringify(this));

    delNode.valuesColor[index] = 'white';
    yield JSON.parse(JSON.stringify(this));

    delNode.values[index] = subsNode.value(0);

    delNode.valuesColor[index] = 'green';
    yield JSON.parse(JSON.stringify(this));

    delNode.valuesColor = [];
    subsNode.valuesColor = [];

    yield JSON.parse(JSON.stringify(this));

    return subsNode.value(0);
  }

  *removeGen(value) {
    let parent = null;
    let current = this.root;

    let i = 0;
    while (current) {
      current.colored = 'blue';
      yield JSON.parse(JSON.stringify(this));
      delete current.colored;

      if (parent && current.size() <= Math.floor(this.limit / 2)) {
        const bkIter = this._borrowKeyGen(parent, i);
        if (bkIter.next().value) {
          for (let yielded of bkIter) {
            yield yielded;
          }
        } else {
          const bnIter = this._bindNodeGen(parent, i);

          while (true) {
            const yielded = bnIter.next();

            if (yielded.done) {
              current = yielded.value;
              break;
            } else {
              yield yielded.value;
            }
          }
        }
      }

      if (current.findValue(value) >= 0) {
        if (!current.leftChildOf(0)) break; // current 가 leaf 노드 인 경우
        const swIter = this._swapGen(current, current.findValue(value));

        while (true) {
          const yielded = swIter.next();

          if (yielded.done) {
            value = yielded.value;
            break;
          } else {
            yield yielded.value;
          }
        }
      }

      parent = current;

      for (i = 0; i < current.size() && current.value(i) <= value; i += 1) {
        current.valuesColor[i] = 'blue';
        yield JSON.parse(JSON.stringify(this));
        current.valuesColor = [];
      }
      current = current.leftChildOf(i);
    }

    if (!current) throw new Error(NON_EXIST_VALUE); // break 하지 못한 경우, value를 트리에서 찾지 못한 것이므로 false 리턴.

    if (current.size() <= Math.floor(this.limit / 2)) {
      const bkIter = this._borrowKeyGen(parent, i);
      if (bkIter.next().value) {
        for (let yielded of bkIter) {
          yield yielded;
        }
      } else {
        const bnIter = this._bindNodeGen(parent, i);

        while (true) {
          const yielded = bnIter.next();

          if (yielded.done) {
            current = yielded.value;
            break;
          } else {
            yield yielded.value;
          }
        }
      }
    }

    current.colored = 'blue';
    yield JSON.parse(JSON.stringify(this));
    delete current.colored;

    current.removeValue(current.findValue(value));
    this.size -= 1;
    return this;
  }
}

export { BTree };
