import { PriorityNode } from './node.js';
import { INVALID_VALUE } from './error.js';
import clone from '../node_modules/clone/clone.js';

/**
 * 우선순위 큐의 구현은 힙과 거의 흡사하다. 우선순위(priority) 가 작을수록(0에 가까울수록) 우선순위가 높은 노드이다.
 */
class PriorityQueue {
  /**
   * 우선순위큐 생성
   */
  constructor() {
    this.nodes = [];
    this.snapshots = [];
  }

  returnSnapshots() {
    const temp = this.snapshots;
    this.snapshots = [];
    return temp;
  }

  /**
   * 현재 우선순위 큐의 요소 개수를 리턴한다.
   * @return {number}
   */
  size() {
    return this.nodes.length;
  }

  /**
   * 새로운 노드를 생성해서 큐에 삽입, 우선순위에 맞는 위치로 이동시킨다.
   * @param {*} value
   * @param {number} priority
   * @param {boolean} isSnapshot
   * @throws {INVALID_VALUE} 만약 priority가 number가 아니라면 예외 발생
   * @return {PriorityQueue} 자기 자신.
   */
  enqueue(value, priority, isSnapshot = false) {
    if (typeof priority !== 'number') throw new Error(INVALID_VALUE);

    this.nodes.push(new PriorityNode(value, priority));

    if (isSnapshot) {
      this.snapshots.push(clone(this));
    }

    let index = this.size() - 1;
    let parentIndex = Math.floor((index - 1) / 2);

    if (isSnapshot && index > 0) {
      this.nodes[index].colored = 'blue';
      this.nodes[parentIndex].colored = 'green';
      this.snapshots.push(clone(this));
    }

    while (index > 0 && this.nodes[index].priority < this.nodes[parentIndex].priority) {
      [this.nodes[index], this.nodes[parentIndex]] = [this.nodes[parentIndex], this.nodes[index]];
      if (isSnapshot) {
        this.snapshots.push(clone(this));
        delete this.nodes[index].colored;
        delete this.nodes[parentIndex].colored;
      }

      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
      if (isSnapshot && index > 0) {
        this.nodes[index].colored = 'blue';
        this.nodes[parentIndex].colored = 'green';
        this.snapshots.push(clone(this));
      }
    }

    if (isSnapshot && index > 0) {
      delete this.nodes[index].colored;
      delete this.nodes[parentIndex].colored;
    }

    return this;
  }

  /**
   * 우선순위가 가장 낮은 노드를 pop 해서 리턴하고, 남은 노드들을 우선순위대로 정렬한다.
   * @param {boolean} isSnapshot
   * @return {PriorityNode} 노드 자체를 리턴한다.l
   */
  dequeue(isSnapshot = false) {
    if (!this.size()) return undefined;
    if (this.size() === 1) return this.nodes.pop();

    const poppedNode = this.nodes[0];
    if (isSnapshot) {
      poppedNode.colored = 'white';
      this.snapshots.push(clone(this));
      this.nodes[this.nodes.length - 1].colored = 'blue';
      this.snapshots.push(clone(this));
    }

    this.nodes[0] = this.nodes.pop();

    if (isSnapshot) {
      this.snapshots.push(clone(this));
    }

    let index = 0;
    let childIndex = index * 2 + 1;
    while (childIndex < this.size()) {
      if (isSnapshot) {
        this.nodes[index].colored = 'blue';
        this.nodes[childIndex].colored = 'green';
        this.snapshots.push(clone(this));
      }

      if (this.nodes[childIndex + 1] && this.nodes[childIndex].priority > this.nodes[childIndex + 1].priority) {
        if (isSnapshot) {
          delete this.nodes[childIndex].colored;
          this.nodes[childIndex + 1].colored = 'green';
          this.snapshots.push(clone(this));
        }
        childIndex += 1;
      }
      if (this.nodes[index].priority <= this.nodes[childIndex].priority) {
        if (isSnapshot) {
          delete this.values[index].colored;
          delete this.values[childIndex].colored;
        }
        break;
      }
      [this.nodes[index], this.nodes[childIndex]] = [this.nodes[childIndex], this.nodes[index]];

      if (isSnapshot) {
        this.snapshots.push(clone(this));
        delete this.nodes[index].colored;
        delete this.nodes[childIndex].colored;
      }
      index = childIndex;
      childIndex = index * 2 + 1;
    }

    if (isSnapshot) {
      delete this.nodes[0].colored;
    }

    return poppedNode;
  }

  /**
   * enqueue 메소드의 진행 상태를 generate 하는 제너레이터 함수.
   * @generator
   * @param {*} value
   * @param {number} priority
   * @throws {INVALID_VALUE} 만약 priority가 number가 아니라면 예외 발생
   * @yields {PriorityQueue} 진행 상황이 시각적으로 표시된 자기 자신.
   * @return {PriorityQueue} 자기 자신.
   */
  *enqueueGen(value, priority) {
    if (typeof priority !== 'number') throw new Error(INVALID_VALUE);

    this.nodes.push(new PriorityNode(value, priority));

    yield this;

    let index = this.size() - 1;
    let parentIndex = Math.floor((index - 1) / 2);

    if (index > 0) {
      this.nodes[index].colored = 'blue';
      this.nodes[parentIndex].colored = 'green';
      yield this;
    }

    while (index > 0 && this.nodes[index].priority < this.nodes[parentIndex].priority) {
      [this.nodes[index], this.nodes[parentIndex]] = [this.nodes[parentIndex], this.nodes[index]];

      yield this;
      delete this.nodes[index].colored;
      delete this.nodes[parentIndex].colored;

      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
      if (index > 0) {
        this.nodes[index].colored = 'blue';
        this.nodes[parentIndex].colored = 'green';
        yield this;
      }
    }

    if (index > 0) {
      delete this.nodes[index].colored;
      delete this.nodes[parentIndex].colored;
    }

    return this;
  }

  /**
   * dequeue 메소드의 진행 상태를 generate 하는 제너레이터 함수.
   * @generator
   * @yields {PriorityQueue} 진행 상태가 시각적으로 표시된 자기 자신.
   * @return {PriorityNode} 노드 자체를 리턴한다.
   */
  *dequeueGen() {
    if (!this.size()) return undefined;
    if (this.size() === 1) return this.nodes.pop();

    const poppedNode = this.nodes[0];

    poppedNode.colored = 'white';
    yield this;
    this.nodes[this.nodes.length - 1].colored = 'blue';
    yield this;

    this.nodes[0] = this.nodes.pop();

    yield this;

    let index = 0;
    let childIndex = index * 2 + 1;
    while (childIndex < this.size()) {
      this.nodes[index].colored = 'blue';
      this.nodes[childIndex].colored = 'green';
      yield this;

      if (this.nodes[childIndex + 1] && this.nodes[childIndex].priority > this.nodes[childIndex + 1].priority) {
        delete this.nodes[childIndex].colored;
        this.nodes[childIndex + 1].colored = 'green';
        yield this;

        childIndex += 1;
      }
      if (this.nodes[index].priority <= this.nodes[childIndex].priority) {
        delete this.values[index].colored;
        delete this.values[childIndex].colored;

        break;
      }
      [this.nodes[index], this.nodes[childIndex]] = [this.nodes[childIndex], this.nodes[index]];

      yield this;
      delete this.nodes[index].colored;
      delete this.nodes[childIndex].colored;

      index = childIndex;
      childIndex = index * 2 + 1;
    }

    delete this.nodes[0].colored;

    return poppedNode;
  }
}

export { PriorityQueue };
