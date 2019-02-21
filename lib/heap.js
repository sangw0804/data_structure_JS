import { INVALID_VALUE } from './error.js';
import { HeapNode } from './node.js';
import clone from '../node_modules/clone/clone.js';

/**
 * Heap 클래스.
 */
class Heap {
  /**
   * Heap 클래스의 생성자 함수.
   * @constructor
   * @param {boolean} max max 프로퍼티가 true 이면 maxHeap, false 이면 minHeap 이다.
   */
  constructor(max = true) {
    this.max = max;
    this.values = [];
    this.snapshots = [];
  }

  /**
   * maxHeap 과 minHeap 을 구분짓는 비교 함수.
   * @param {number} parentIndex
   * @param {number} childIndex
   * @returns {boolean} 부모와 자식 노드의 값의 대소 관계 비교 결과를 boolean으로 리턴.
   */
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

  /**
   * 현재 heap의 노드 개수를 반환.
   * @returns {number}
   */
  size() {
    return this.values.length;
  }

  /**
   * 트리의 가장 아래에 value를 삽입한 뒤, 맞는 위치에 올때까지 위로 올린다.
   * @param {number} value
   * @param {*} isSnapshot
   * @throws {INVALID_VALUE} value가 number타입이 아닌 경우 예외 발생.
   * @returns {Heap} insert 완료된 자기 자신을 리턴한다.
   */
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

  /**
   * 트리의 root 에 있는 값을 리턴하고 가장 마지막에 있는 값을 root로 옮긴 다음, 맞는 위치에 올때까지 밑으로 내린다.
   * @param {*} isSnapshot
   * @returns {*} root에 있는 노드의 value.
   */
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
      if (!this._compare(index, childIndex)) {
        if (isSnapshot) {
          delete this.values[index].colored;
          delete this.values[childIndex].colored;
        }
        break;
      }
      [this.values[index], this.values[childIndex]] = [this.values[childIndex], this.values[index]];

      if (isSnapshot) {
        this.snapshots.push(clone(this));
        delete this.values[index].colored;
        delete this.values[childIndex].colored;
      }
      index = childIndex;
      childIndex = index * 2 + 1;
    }

    if (isSnapshot) {
      delete this.values[0].colored;
    }

    return poppedValue;
  }

  /**
   * insert 메소드의 진행 상태를 generate 하는 제너레이터 함수.
   * @generator
   * @param {number} value
   * @throws {INVALID_VALUE} value가 number타입이 아닌 경우 예외 발생.
   * @yields {Heap} 진행 상태가 시각적으로 표시된 자기 자신.
   * @returns {Heap} insert 완료된 자기 자신을 리턴한다.
   */
  *insertGen(value) {
    if (typeof value !== 'number') throw new Error(INVALID_VALUE);

    this.values.push(new HeapNode(value));

    yield this;

    let index = this.size() - 1;
    let parentIndex = Math.floor((index - 1) / 2);
    if (index > 0) {
      this.values[index].colored = 'blue';
      this.values[parentIndex].colored = 'green';
      yield this;
    }

    while (index > 0 && this._compare(parentIndex, index)) {
      [this.values[index], this.values[parentIndex]] = [this.values[parentIndex], this.values[index]];

      yield this;
      delete this.values[index].colored;
      delete this.values[parentIndex].colored;

      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
      if (index > 0) {
        this.values[index].colored = 'blue';
        this.values[parentIndex].colored = 'green';
        yield this;
      }
    }

    if (index > 0) {
      delete this.values[index].colored;
      delete this.values[parentIndex].colored;
    }

    return this;
  }

  /**
   * pop 메소드의 진행 상태를 generate 하는 제너레이터 함수.
   * @generator
   * @yields {Heap} 진행 상태가 시각적으로 표시된 자기 자신.
   * @returns {*} root에 있는 노드의 value.
   */
  *popGen() {
    if (!this.size()) return undefined;
    if (this.size() === 1) return this.values.pop();

    const poppedValue = this.values[0];

    poppedValue.colored = 'white';
    yield this;
    this.values[this.values.length - 1].colored = 'blue';
    yield this;

    this.values[0] = this.values.pop();

    yield this;

    let index = 0;
    let childIndex = index * 2 + 1;

    while (childIndex < this.size()) {
      this.values[index].colored = 'blue';
      this.values[childIndex].colored = 'green';
      yield this;

      if (childIndex + 1 < this.size() && this._compare(childIndex, childIndex + 1)) {
        delete this.values[childIndex].colored;
        this.values[childIndex + 1].colored = 'green';
        yield this;

        childIndex += 1;
      }
      if (!this._compare(index, childIndex)) {
        delete this.values[index].colored;
        delete this.values[childIndex].colored;

        break;
      }
      [this.values[index], this.values[childIndex]] = [this.values[childIndex], this.values[index]];

      yield this;
      delete this.values[index].colored;
      delete this.values[childIndex].colored;

      index = childIndex;
      childIndex = index * 2 + 1;
    }

    delete this.values[0].colored;

    return poppedValue;
  }
}

export { Heap };
