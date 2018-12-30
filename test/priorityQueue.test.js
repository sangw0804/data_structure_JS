import expect from 'expect';
import { PriorityQueue } from '../lib';

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
});
