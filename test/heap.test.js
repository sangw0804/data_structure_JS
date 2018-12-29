import expect from 'expect';
import { Heap } from '../lib';
import { INVALID_VALUE } from '../lib/error';

let emptyMaxHeap;
let emptyMinHeap;
let multiMaxHeap;
let multiMinHeap;

beforeEach(() => {
  emptyMaxHeap = new Heap();
  emptyMinHeap = new Heap(false);
  multiMaxHeap = new Heap();
  multiMaxHeap
    .insert(10)
    .insert(20)
    .insert(5)
    .insert(15)
    .insert(1);
  multiMinHeap = new Heap(false);
  multiMinHeap
    .insert(10)
    .insert(20)
    .insert(5)
    .insert(15)
    .insert(1);
});

describe('MaxHeap Test', () => {
  // MaxHeap 초기화
  describe('MaxHeap - initialize', () => {
    it('should make empty maxHeap', () => {
      expect(emptyMaxHeap.size()).toBe(0);
      expect(emptyMaxHeap.max).toBe(true);
    });
  });

  // insert 메소드 테스트
  describe('MaxHeap - insert', () => {
    // 숫자가 value로 주어지면 맞는 위치에 insert 한다.
    it('should insert value in correct position', () => {
      emptyMaxHeap.insert(5);
      expect(emptyMaxHeap.values[0]).toBe(5);
      emptyMaxHeap.insert(3);
      expect(emptyMaxHeap.values[1]).toBe(3);
      emptyMaxHeap.insert(10);
      expect(emptyMaxHeap.values[0]).toBe(10);
      expect(emptyMaxHeap.size()).toBe(3);
    });

    // 숫자가 이닌 값이 value 로 주어지면 에러를 발생시킨다.
    it('should throw error if value is not a number', () => {
      expect(() => emptyMaxHeap.insert('1')).toThrow(INVALID_VALUE);
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

  // insert 메소드 테스트
  describe('MinHeap - insert', () => {
    // 숫자가 value로 주어지면 맞는 위치에 insert 한다.
    it('should insert value in correct position', () => {
      emptyMinHeap.insert(5);
      expect(emptyMinHeap.values[0]).toBe(5);
      emptyMinHeap.insert(3);
      expect(emptyMinHeap.values[1]).toBe(5);
      emptyMinHeap.insert(10);
      expect(emptyMinHeap.values[0]).toBe(3);
      expect(emptyMinHeap.values[2]).toBe(10);
      expect(emptyMinHeap.size()).toBe(3);
    });

    // 숫자가 이닌 값이 value 로 주어지면 에러를 발생시킨다.
    it('should throw error if value is not a number', () => {
      expect(() => emptyMinHeap.insert('1')).toThrow(INVALID_VALUE);
      expect(emptyMinHeap.size()).toBe(0);
      expect(emptyMinHeap.max).toBe(false);
    });
  });
});
