import expect from 'expect';
import { PriorityQueue } from '../lib';
import { INVALID_VALUE } from '../lib/error';

let emptyPriorityQueue;

beforeEach(() => {
  emptyPriorityQueue = new PriorityQueue();
});

describe('Priority Queue Test', () => {
  // 초기화 테스트
  describe('Initialize Priority Queue', () => {
    it('should make empty Priority Queue', () => {
      expect(emptyPriorityQueue.size()).toBe(0);
    });
  });

  // enqueue 테스트
  describe('Priority Queue - enqueue', () => {
    // 노드를 생성해서 우선순위에 맞는 위치에 삽입한다.
    it('should make new node and insert it in correct position', () => {
      emptyPriorityQueue.enqueue('A', 3);
      expect(emptyPriorityQueue.nodes[0].value).toBe('A');
      expect(emptyPriorityQueue.size()).toBe(1);
      emptyPriorityQueue.enqueue('B', 6);
      emptyPriorityQueue.enqueue('C', 1);
      emptyPriorityQueue.enqueue('D', 4);
      expect(emptyPriorityQueue.size()).toBe(4);
      expect(emptyPriorityQueue.nodes[0].value).toBe('C');
      expect(emptyPriorityQueue.nodes[1].value).toBe('D');
      expect(emptyPriorityQueue.nodes[2].value).toBe('A');
      expect(emptyPriorityQueue.nodes[3].value).toBe('B');
    });

    // 우선순위가 number 가 아닐 경우 에러를 발생시킨다.
    it('should throw error if priority is not a number', () => {
      expect(() => emptyPriorityQueue.enqueue('A', true)).toThrow(INVALID_VALUE);
      expect(emptyPriorityQueue.size()).toBe(0);
    });
  });
});
