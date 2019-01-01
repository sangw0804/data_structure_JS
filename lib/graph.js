/*
 *  인접 리스트를 사용해 그래프 구현
 */

class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  size() {
    return Object.keys(this.adjacencyList).length;
  }
}

export { Graph };
