import expect from 'expect';
import { Queue } from '../lib';

let emptyQueue;

beforeEach(() => {
  emptyQueue = new Queue();
});

describe('Queue Test', () => {
  // Queue 초기화 테스트
  describe('Initialize Queue', () => {
    it('should make empty queue', () => {
      expect(emptyQueue.size()).toBe(0);
      expect(emptyQueue.head).toBeNull();
      expect(emptyQueue.tail).toBeNull();
    });
  });
});
