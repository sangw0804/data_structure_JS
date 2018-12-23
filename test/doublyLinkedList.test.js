import expect from 'expect';
import { DoublyLinkedList } from '../lib';

// 테스트 용 Dll
let emptyDll;
let oneNodeDll;
let twoNodeDll;

// 매 테스트마다 사용할 Dll들 만들기
beforeEach(() => {
  emptyDll = new DoublyLinkedList();
  oneNodeDll = new DoublyLinkedList();
  oneNodeDll.push(1);
  twoNodeDll = new DoublyLinkedList();
  twoNodeDll.push(1).push(2);
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

  // push 메소드 테스트
  describe('DLL - push', () => {
    // DLL 에 노드가 없을 경우 하나의 노드를 만들고 그 노드를 head 이자 tail 노드로 정한다.
    it('should make new node and make it as a tail and head WHEN length === 0', () => {
      emptyDll.push(1);
      expect(emptyDll.head.value).toBe(1);
      expect(emptyDll.tail.value).toBe(1);
      expect(emptyDll.size()).toBe(1);
    });

    // DLL 에 노드가 있을 경우 tail 뒤에 새 노드를 추가하고 그 노드를 tail 노드로 정한다.
    it('should make new node and set it as a new tail WHEN length >= 1', () => {
      oneNodeDll.push(2);
      expect(oneNodeDll.tail.value).toBe(2);
      expect(oneNodeDll.tail.before.value).toBe(1);
      expect(oneNodeDll.head.next.value).toBe(2);
      expect(oneNodeDll.size()).toBe(2);
    });
  });

  // pop 메소드 테스트
  describe('DLL - pop', () => {
    // DLL 에 노드가 없을 경우 undefined를 리턴한다
    it('should return undefined WHEN length === 0', () => {
      const poppedValue = emptyDll.pop();
      expect(poppedValue).toBeUndefined();
      expect(emptyDll.size()).toBe(0);
      expect(emptyDll.head).toBeNull();
      expect(emptyDll.tail).toBeNull();
    });

    // DLL 에 하나의 노드가 있을 경우, 해당 노드의 값을 리턴하고 빈 DLL이 된다.
    it('should return remainder node WHEN length === 1', () => {
      const poppedValue = oneNodeDll.pop();
      expect(poppedValue).toBe(1);
      expect(oneNodeDll.size()).toBe(0);
      expect(oneNodeDll.head).toBeNull();
      expect(oneNodeDll.tail).toBeNull();
    });

    // DLL 에 둘 이상의 노드가 있을 경우, tail 노드를 pop 해서 그 값을 리턴한다.
    it('should return tail node WHEN length >= 2', () => {
      const poppedValue = twoNodeDll.pop();
      expect(poppedValue).toBe(2);
      expect(twoNodeDll.head.value).toBe(1);
      expect(twoNodeDll.head.next).toBeNull();
      expect(twoNodeDll.tail.value).toBe(1);
      expect(twoNodeDll.tail.before).toBeNull();
      expect(twoNodeDll.size()).toBe(1);
    });
  });

  // unshift 메소드 테스트
  describe('DLL - unshift', () => {
    // DLL 에 노드가 없을 경우 하나의 노드를 만들고 그 노드를 head 이자 tail 노드로 정한다.
    it('should make new node and make it as a tail and head WHEN length === 0', () => {
      emptyDll.unshift(1);
      expect(emptyDll.head.value).toBe(1);
      expect(emptyDll.tail.value).toBe(1);
      expect(emptyDll.size()).toBe(1);
    });

    // DLL 에 노드가 있을 경우 head 앞에 하나의 노드를 추가하고 그 노드를 새 head 노드로 정한다.
    it('should make new node and make it as new head WHEN length >= 1', () => {
      oneNodeDll.unshift(2);
      expect(oneNodeDll.head.value).toBe(2);
      expect(oneNodeDll.head.next.value).toBe(1);
      expect(oneNodeDll.head.next.next).toBeNull();
      expect(oneNodeDll.tail.value).toBe(1);
      expect(oneNodeDll.tail.before.value).toBe(2);
      expect(oneNodeDll.tail.before.before).toBeNull();
      expect(oneNodeDll.size()).toBe(2);
    });
  });
});
