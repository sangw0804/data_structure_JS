import expect from 'expect';
import { DoublyLinkedList } from '../lib';

// 테스트 용 Dll
let emptyDll;
let oneNodeDll;

// 매 테스트마다 사용할 Dll들 만들기
beforeEach(() => {
  emptyDll = new DoublyLinkedList();
  oneNodeDll = new DoublyLinkedList();
  oneNodeDll.push(1);
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

  // size 메소트 테스트
  describe('DLL - size', () => {
    it('should return size of dll!', () => {});
  });

  // push 메소드 테스트
  describe('DLL - push', () => {
    // DLL 에 노드가 없을 경우 하나의 노드를 만들고 그 노드를 head 이자 tail 노드로 정한다.
    it('should make new node and make it as a tail and head WHEN length === 0', () => {
      emptyDll.push(1);
      expect(emptyDll.head.value).toBe(1);
      expect(emptyDll.tail.value).toBe(1);
      expect(emptyDll.length).toBe(1);
    });

    // DLL 에 노드가 있을 경우 tail 뒤에 새 노드를 추가하고 그 노드를 tail 노드로 정한다.
    it('should make new node and set it as a new tail WHEN length >= 1', () => {
      oneNodeDll.push(2);
      expect(oneNodeDll.tail.value).toBe(2);
      expect(oneNodeDll.tail.before.value).toBe(1);
      expect(oneNodeDll.head.next.value).toBe(2);
      expect(oneNodeDll.length).toBe(2);
    });
  });
});
