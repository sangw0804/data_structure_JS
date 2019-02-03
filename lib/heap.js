/*
 *  heap 인스턴스 생성 시 maxHeap 인지 minHeap 인지 구분한다.
 */

import { INVALID_VALUE } from './error.js';
import { HeapNode } from './node.js';
import clone from '../node_modules/clone/clone.js';

class Heap {
  constructor(max = true) {
    this.max = max; // max 프로퍼티가 true 이면 maxHeap, false 이면 minHeap 이다.
    this.values = [];
    this.snapshots = [];
  }

  // maxHeap 과 minHeap 을 구분짓는 비교 함수.
  _compare(parentIndex, childIndex) {
    // maxHeap 이면 부모 노드의 값이 자식 노드의 값보다 작은지 여부를 반환
    if (this.max) return this.values[parentIndex].value < this.values[childIndex].value;
    // minHeap 이면 부모 노드의 값이 자식 노드의 값보다 큰지 여부를 반환
    return this.values[parentIndex].value > this.values[childIndex].value;
  }

  returnSnapshots() {
    const temp = this.snapshots;
    this.snapshots = [];
    return temp;
  }

  size() {
    return this.values.length;
  }

  // 트리의 가장 아래에 value를 삽입한 뒤, 맞는 위치에 올때까지 위로 올린다.
  insert(value, isSnapshot = false) {
    if (typeof value !== 'number') throw new Error(INVALID_VALUE);

    this.values.push(new HeapNode(value));
    if (isSnapshot) {
      this.snapshots.push(clone(this));
    }

    let index = this.size() - 1;
    let parentIndex = Math.floor((index - 1) / 2);
    if (isSnapshot && index > 0) {
      this.values[index].colored = 'blue';
      this.values[parentIndex].colored = 'green';
      this.snapshots.push(clone(this));
    }

    while (index > 0 && this._compare(parentIndex, index)) {
      [this.values[index], this.values[parentIndex]] = [this.values[parentIndex], this.values[index]];
      if (isSnapshot) {
        this.snapshots.push(clone(this));
        delete this.values[index].colored;
        delete this.values[parentIndex].colored;
      }
      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
      if (isSnapshot && index > 0) {
        this.values[index].colored = 'blue';
        this.values[parentIndex].colored = 'green';
        this.snapshots.push(clone(this));
      }
    }

    if (isSnapshot && index > 0) {
      delete this.values[index].colored;
      delete this.values[parentIndex].colored;
    }

    return this;
  }

  // 트리의 root 에 있는 값을 리턴하고 가장 마지막에 있는 값을 root로 옮긴 다음, 맞는 위치에 올때까지 밑으로 내린다.
  pop(isSnapshot = false) {
    if (!this.size()) return undefined;
    if (this.size() === 1) return this.values.pop();

    const poppedValue = this.values[0];
    if (isSnapshot) {
      poppedValue.colored = 'white';
      this.snapshots.push(clone(this));
      this.values[this.values.length - 1].colored = 'blue';
      this.snapshots.push(clone(this));
    }

    this.values[0] = this.values.pop();

    if (isSnapshot) {
      this.snapshots.push(clone(this));
    }

    let index = 0;
    let childIndex = index * 2 + 1;

    while (childIndex < this.size()) {
      if (isSnapshot) {
        this.values[index].colored = 'blue';
        this.values[childIndex].colored = 'green';
        this.snapshots.push(clone(this));
      }

      if (childIndex + 1 < this.size() && this._compare(childIndex, childIndex + 1)) {
        if (isSnapshot) {
          delete this.values[childIndex].colored;
          this.values[childIndex + 1].colored = 'green';
          this.snapshots.push(clone(this));
        }
        childIndex += 1;
      }
      if (!this._compare(index, childIndex)) break;
      [this.values[index], this.values[childIndex]] = [this.values[childIndex], this.values[index]];

      if (isSnapshot) {
        this.snapshots.push(clone(this));
        delete this.values[index].colored;
        delete this.values[childIndex].colored;
      }
      index = childIndex;
      childIndex = index * 2 + 1;
    }

    return poppedValue;
  }
}

export { Heap };
