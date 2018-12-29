/*
 *  heap 인스턴스 생성 시 maxHeap 인지 minHeap 인지 구분한다.
 */

class Heap {
  constructor(max = true) {
    this.max = max;
    this.values = [];
  }

  size() {
    return this.values.length;
  }
}

export { Heap };
