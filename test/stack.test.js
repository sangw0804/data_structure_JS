import expect from 'expect';
import { Stack } from '../lib';

let emptyStack;

beforeEach(() => {
  emptyStack = new Stack();
});

describe('Stack Test', () => {
  // 초기화 테스트
  describe('Initialize Stack', () => {
    it('should make empty stack!', () => {
      expect(emptyStack.size()).toBe(0);
      expect(emptyStack.pop()).toBeUndefined();
    });
  });

  // push & pop 메소드 테스트
  describe('Stack - push & pop', () => {
    it('should push & pop value in stack', () => {
      emptyStack.push(1);
      expect(emptyStack.size()).toBe(1);
      emptyStack.push(2);
      expect(emptyStack.pop()).toBe(2);
      emptyStack.push(3);
      expect(emptyStack.size()).toBe(2);
      expect(emptyStack.pop()).toBe(3);
      expect(emptyStack.pop()).toBe(1);
      expect(emptyStack.pop()).toBeUndefined();
      expect(emptyStack.size()).toBe(0);
    });
  });
});
