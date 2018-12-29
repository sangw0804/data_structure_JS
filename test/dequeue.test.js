import expect from 'expect';
import { Dequeue } from '../lib';

let emptyDequeue;

beforeEach(() => {
  emptyDequeue = new Dequeue();
});

describe('Dequeue Test', () => {
  // Dequeue 초기화 테스트
  describe('Initialize Dequeue', () => {
    it('should make empty dequeue', () => {
      expect(emptyDequeue.size()).toBe(0);
      expect(emptyDequeue.head).toBeNull();
      expect(emptyDequeue.tail).toBeNull();
    });
  });

  // pushHead & pushTail & popHead & popTail 메소드 테스트
  describe('Dequeue - pushHead & pushTail & popHead & popTail', () => {
    it('should push & pop at both head & tail correctly', () => {
      emptyDequeue.pushHead(1);
      emptyDequeue.pushTail(2);
      expect(emptyDequeue.size()).toBe(2);
      expect(emptyDequeue.popHead()).toBe(1);
      emptyDequeue.pushHead(3);
      emptyDequeue.pushTail(4);
      expect(emptyDequeue.popTail()).toBe(4);
      expect(emptyDequeue.popTail()).toBe(2);
      expect(emptyDequeue.popTail()).toBe(3);
      expect(emptyDequeue.popTail()).toBeUndefined();
      expect(emptyDequeue.popHead()).toBeUndefined();
      expect(emptyDequeue.size()).toBe(0);
    });
  });
});
