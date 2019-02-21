import { EXIST_VALUE, NON_EXIST_VALUE } from './error.js';

/**
 * 인접 리스트를 사용해 그래프 구현.
 * vertex(노드) 들과 노드를 연결하는 edge(간선) 으로 구성되어 있으며, 방향과 가중치가 없는 기본 그래프이다.
 */
class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  /**
   * vertex(노드)의 개수 리턴.
   * @returns {number}
   */
  sizeVertex() {
    return Object.keys(this.adjacencyList).length;
  }

  /**
   * edge(간선)의 개수 리턴.
   * @returns {number}
   */
  sizeEdge() {
    return Object.values(this.adjacencyList).reduce((prev, curr) => prev + curr.length, 0) / 2;
  }

  /**
   * 그래프에 새로운 vertex를 추가한다.
   * @param {*} vertex
   * @throws {EXIST_VALUE} 이미 존재하는 값이 vertex로 주어진 경우 예외 발생.
   * @returns {Graph} 새로운 vertex가 추가된 객체 자신을 리턴.
   */
  addVertex(vertex) {
    if (this.adjacencyList[vertex]) throw new Error(EXIST_VALUE);

    this.adjacencyList[vertex] = [];

    return this;
  }

  /**
   * 그래프에 존재하는 두 vertex를 있는 edge를 추가한다.
   * @param {*} vertex1
   * @param {*} vertex2
   * @throws {NON_EXIST_VALUE} 주어진 두 vertex중 존재하지 않는 값이 있을 경우 예외 발생.
   * @returns {Graph} 새로운 edge가 추가된 객체 자신을 리턴.
   */
  addEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) throw new Error(NON_EXIST_VALUE);

    this.adjacencyList[vertex1].push(vertex2);
    this.adjacencyList[vertex2].push(vertex1);

    return this;
  }

  // 그래프에 존재하는 edge를 제거한다.
  removeEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) throw new Error(NON_EXIST_VALUE);

    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(adjacentVertex => adjacentVertex !== vertex2);
    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(adjacentVertex => adjacentVertex !== vertex1);

    return this;
  }

  // 그래프에 존재하는 vertex를 제거한다.
  removeVertex(vertex) {
    if (!this.adjacencyList[vertex]) throw new Error(NON_EXIST_VALUE);

    this.adjacencyList[vertex].forEach(adjacentVertex => this.removeEdge(vertex, adjacentVertex));
    delete this.adjacencyList[vertex];

    return this;
  }
}

export { Graph };
