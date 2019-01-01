import expect from 'expect';
import { Graph } from '../lib';
import { EXIST_VALUE, NON_EXIST_VALUE } from '../lib/error';

let emptyGraph;
let threeVertexGraph;
let threeVertexTwoEdgeGraph;

beforeEach(() => {
  emptyGraph = new Graph();
  threeVertexGraph = new Graph();
  threeVertexGraph
    .addVertex('a')
    .addVertex('b')
    .addVertex('c');
  threeVertexTwoEdgeGraph = new Graph();
  threeVertexTwoEdgeGraph
    .addVertex('a')
    .addVertex('b')
    .addVertex('c')
    .addEdge('a', 'b')
    .addEdge('a', 'c');
});

describe('Graph Test', () => {
  // 초기화 테스트
  describe('Initialize Graph', () => {
    it('should make empty graph', () => {
      expect(emptyGraph.adjacencyList).toBeTruthy();
      expect(emptyGraph.sizeVertex()).toBe(0);
      expect(emptyGraph.sizeEdge()).toBe(0);
    });
  });

  // addVertex 메소드 테스트
  describe('addVertex', () => {
    // 새로운 vertex를 그래프에 추가한다.
    it('should add vertex in graph', () => {
      const vertex1 = 'a';
      const vertex2 = 'b';
      emptyGraph.addVertex(vertex1);
      emptyGraph.addVertex(vertex2);
      expect(emptyGraph.sizeVertex()).toBe(2);
      expect(emptyGraph.sizeEdge()).toBe(0);
      expect(emptyGraph.adjacencyList[vertex1]).toBeTruthy();
      expect(emptyGraph.adjacencyList[vertex2]).toBeTruthy();
    });

    // 이미 존재하는 vertex 일 경우 에러를 발생시킨다.
    it('should throw error if vertex already exist in graph', () => {
      const vertex = 'a';
      emptyGraph.addVertex(vertex);
      expect(() => emptyGraph.addVertex(vertex)).toThrow(EXIST_VALUE);
      expect(emptyGraph.sizeVertex()).toBe(1);
      expect(emptyGraph.adjacencyList[vertex]).toBeTruthy();
    });
  });

  // addEdge 메소드 테스트
  describe('addEdge', () => {
    // 새로운 edge를 그래프에 추가한다.
    it('should add edge in graph', () => {
      // 연결할 두 vertex를 인자로 전달한다.
      threeVertexGraph.addEdge('a', 'b');
      expect(threeVertexGraph.adjacencyList['a']).toContain('b');
      expect(threeVertexGraph.adjacencyList['b']).toContain('a');
      expect(threeVertexGraph.sizeVertex()).toBe(3);
      expect(threeVertexGraph.sizeEdge()).toBe(1);
      threeVertexGraph.addEdge('a', 'c');
      expect(threeVertexGraph.adjacencyList['a']).toEqual(['b', 'c']);
      expect(threeVertexGraph.adjacencyList['c']).toContain('a');
      expect(threeVertexGraph.sizeEdge()).toBe(2);
    });

    // 만약 연결할 두 vertex 중 그래프에 존재하지 않는 것이 있다면 에러를 발생시킨다.
    it("should throw new error if vertex doesn't exist in graph", () => {
      expect(() => threeVertexGraph.addEdge('a', 'f')).toThrow(NON_EXIST_VALUE);
    });
  });
});
