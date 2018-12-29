import expect from 'expect';
import { Heap } from '../lib';

let emptyMaxHeap;
let emptyMinHeap;

beforeEach(() => {
  emptyMaxHeap = new Heap();
  emptyMinHeap = new Heap(false);
});

describe('MaxHeap Test', () => {
  // MaxHeap 초기화
  describe('MaxHeap - initialize', () => {
    it('should make empty maxHeap', () => {
      expect(emptyMaxHeap.size()).toBe(0);
      expect(emptyMaxHeap.max).toBe(true);
    });
  });
});

describe('MinHeap Test', () => {
  // MinHeap 초기화
  describe('MinHeap - initialize', () => {
    it('should make empty minHeap', () => {
      expect(emptyMinHeap.size()).toBe(0);
      expect(emptyMinHeap.max).toBe(false);
    });
  });
});
