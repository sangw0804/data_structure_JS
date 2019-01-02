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

  // enqueue & dequeue 테스트
  describe('enqueue & dequeue', () => {
    it('enqueue & dequeue values in queue', () => {
      emptyQueue.enqueue(1);
      expect(emptyQueue.size()).toBe(1);
      expect(emptyQueue.dequeue()).toBe(1);
      emptyQueue.enqueue(2);
      emptyQueue.enqueue(3);
      expect(emptyQueue.size()).toBe(2);
      expect(emptyQueue.dequeue()).toBe(2);
      expect(emptyQueue.dequeue()).toBe(3);
      expect(emptyQueue.dequeue()).toBeUndefined();
    });
  });
});
