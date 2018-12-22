import expect from 'expect';
import { DoublyLinkedList } from '../lib';

// 테스트 용 Dll
let emptyDll;

// 매 테스트마다 사용할 Dll들 만들기
beforeEach(() => {
  emptyDll = new DoublyLinkedList();
});

describe('Doubly Linked List test', () => {
  // 초기화 테스트
  describe('Initialize DLL', () => {
    it('should make empty DLL!', () => {
      expect(emptyDll.length).toBe(0);
      expect(emptyDll.head).toBeNull();
      expect(emptyDll.tail).toBeNull();
    });
  });
});
