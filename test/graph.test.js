import expect from 'expect';
import { Graph } from '../lib';

let emptyGraph;

beforeEach(() => {
  emptyGraph = new Graph();
});

describe('Graph Test', () => {
  // 초기화 테스트
  describe('Initialize Graph', () => {
    it('should make empty graph', () => {
      expect(emptyGraph.adjacencyList).toBeTruthy();
      expect(emptyGraph.size()).toBe(0);
    });
  });
});
