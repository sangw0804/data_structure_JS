/*
 *  인접 리스트를 사용해 그래프 구현.
 *  vertex(노드) 들과 노드를 연결하는 edge(간선) 으로 구성되어 있으며, 방향과 가중치가 없는 기본 그래프이다.
 */

import { EXIST_VALUE, NON_EXIST_VALUE } from './error';

class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  sizeVertex() {
    return Object.keys(this.adjacencyList).length;
  }

  sizeEdge() {
    return Object.values(this.adjacencyList).reduce((prev, curr) => prev + curr.length, 0) / 2;
  }

  // 그래프에 새로운 vertex를 추가한다.
  addVertex(vertex) {
    if (this.adjacencyList[vertex]) throw new Error(EXIST_VALUE);

    this.adjacencyList[vertex] = [];

    return this;
  }

  // 그래프에 존재하는 두 vertex를 있는 edge를 추가한다.
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
