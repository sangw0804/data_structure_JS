/*
 *  heap 인스턴스 생성 시 maxHeap 인지 minHeap 인지 구분한다.
 */

import { INVALID_VALUE } from './error';

class Heap {
  constructor(max = true) {
    this.max = max; // max 프로퍼티가 true 이면 maxHeap, false 이면 minHeap 이다.
    this.values = [];
  }

  // maxHeap 과 minHeap 을 구분짓는 비교 함수.
  _compare(parentIndex, childIndex) {
    // maxHeap 이면 부모 노드의 값이 자식 노드의 값보다 작은지 여부를 반환
    if (this.max) return this.values[parentIndex] < this.values[childIndex];
    // minHeap 이면 부모 노드의 값이 자식 노드의 값보다 큰지 여부를 반환
    return this.values[parentIndex] > this.values[childIndex];
  }

  size() {
    return this.values.length;
  }

  // 트리의 가장 아래에 value를 삽입한 뒤, 맞는 위치에 올때까지 위로 올린다.
  insert(value) {
    if (typeof value !== 'number') throw new Error(INVALID_VALUE);

    this.values.push(value);

    let index = this.size() - 1;
    let parentIndex = Math.floor((index - 1) / 2);

    while (index > 0 && this._compare(parentIndex, index)) {
      [this.values[index], this.values[parentIndex]] = [this.values[parentIndex], this.values[index]];
      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
    }

    return this;
  }
}

export { Heap };
