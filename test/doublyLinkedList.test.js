import expect from 'expect';
import { DoublyLinkedList } from '../lib';
import { INDEX_OUT_OF_ORDER } from '../lib/error';

// 테스트 용 Dll
let emptyDll;
let oneNodeDll;
let twoNodeDll;
let threeNodeDll;

// 매 테스트마다 사용할 Dll들 만들기
beforeEach(() => {
  emptyDll = new DoublyLinkedList();
  oneNodeDll = new DoublyLinkedList();
  oneNodeDll.push(1);
  twoNodeDll = new DoublyLinkedList();
  twoNodeDll.push(1).push(2);
  threeNodeDll = new DoublyLinkedList();
  threeNodeDll
    .push(1)
    .push(2)
    .push(3);
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
  describe('push', () => {
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
  describe('pop', () => {
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
  describe('unshift', () => {
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

  // shift 메소드 테스트
  describe('shift', () => {
    // DLL 에 노드가 없을 경우 undefined 를 리턴한다.
    it('should return undefined WHEN length === 0', () => {
      const shiftedValue = emptyDll.shift();
      expect(shiftedValue).toBeUndefined();
      expect(emptyDll.size()).toBe(0);
      expect(emptyDll.head).toBeNull();
      expect(emptyDll.tail).toBeNull();
    });

    // DLL 에 노드가 하나 있을 경우 그 노드의 값을 리턴하고 빈 노드가 된다.
    it('should return left value WHEN length === 1', () => {
      const shiftedValue = oneNodeDll.shift();
      expect(shiftedValue).toBe(1);
      expect(oneNodeDll.size()).toBe(0);
      expect(oneNodeDll.head).toBeNull();
      expect(oneNodeDll.tail).toBeNull();
    });

    // DLL 에 노드가 두개 있을 경우 head 노드를 pop 해서 그 값을 리턴하고, tail 노드가 head 노드가 된다.
    it('should return head value and tail node become head WHEN length === 2', () => {
      const shiftedValue = twoNodeDll.shift();
      expect(shiftedValue).toBe(1);
      expect(twoNodeDll.head.value).toBe(2);
      expect(twoNodeDll.head.next).toBeNull();
      expect(twoNodeDll.head.before).toBeNull();
      expect(twoNodeDll.tail.value).toBe(2);
      expect(twoNodeDll.size()).toBe(1);
    });
  });

  // insert 메소드 테스트
  describe('insert', () => {
    // 해당 index 위치에 새로운 노드를 생성해서 삽입한다.
    it('should insert node in valid index', () => {
      twoNodeDll.insert(1, 3);
      expect(twoNodeDll.head.next.value).toBe(3);
      expect(twoNodeDll.head.next.next.value).toBe(2);
      expect(twoNodeDll.tail.before.value).toBe(3);
      expect(twoNodeDll.tail.before.before.value).toBe(1);
      expect(twoNodeDll.size()).toBe(3);
    });

    // 맨 앞에 insert 하는 엣지 케이스
    it('should insert node in head', () => {
      twoNodeDll.insert(0, 3);
      expect(twoNodeDll.head.value).toBe(3);
      expect(twoNodeDll.head.next.next.value).toBe(2);
      expect(twoNodeDll.tail.before.before.value).toBe(3);
      expect(twoNodeDll.size()).toBe(3);
    });

    // 맨 뒤에 insert 하는 엣지 케이스
    it('should insert node in tail', () => {
      twoNodeDll.insert(2, 3);
      expect(twoNodeDll.tail.value).toBe(3);
      expect(twoNodeDll.head.next.next.value).toBe(3);
      expect(twoNodeDll.tail.before.before.value).toBe(1);
      expect(twoNodeDll.size()).toBe(3);
    });

    // 유효하지 않은 index 인 경우 error를 발생시킨다.
    it('should throw error if index is invalid', () => {
      expect(() => twoNodeDll.insert(3, 4)).toThrow(INDEX_OUT_OF_ORDER);
      expect(twoNodeDll.size()).toBe(2);
    });
  });

  // remove 메소드 테스트
  describe('remove', () => {
    // 해당 index 위치에 있는 노드를 pop 해서 삭제하고 그 값을 리턴한다.
    it('should remove node with valid index and return value', () => {
      const removedValue = threeNodeDll.remove(1);
      expect(removedValue).toBe(2);
      expect(threeNodeDll.size()).toBe(2);
      expect(threeNodeDll.head.value).toBe(1);
      expect(threeNodeDll.tail.value).toBe(3);
      expect(threeNodeDll.head.next.value).toBe(3);
      expect(threeNodeDll.tail.before.value).toBe(1);
    });

    // 유효하지 않은 index의 경우 에러를 발생시킨다.
    it('should throw error with invalid index', () => {
      expect(() => twoNodeDll.remove(2)).toThrow(INDEX_OUT_OF_ORDER);
      expect(twoNodeDll.size()).toBe(2);
      expect(twoNodeDll.head.value).toBe(1);
      expect(twoNodeDll.head.next.value).toBe(2);
      expect(twoNodeDll.tail.value).toBe(2);
      expect(twoNodeDll.tail.before.value).toBe(1);
    });
  });

  // reverse 메소드 테스트
  describe('reverse', () => {
    // length > 1 일 때, DLL을 뒤집는다.
    it('should reverse dll WHEN length > 1', () => {
      threeNodeDll.reverse();
      expect(threeNodeDll.head.before).toBeNull();
      expect(threeNodeDll.head.value).toBe(3);
      expect(threeNodeDll.head.next.value).toBe(2);
      expect(threeNodeDll.head.next.next.value).toBe(1);
      expect(threeNodeDll.head.next.next.next).toBeNull();
      expect(threeNodeDll.tail.next).toBeNull();
      expect(threeNodeDll.tail.value).toBe(1);
      expect(threeNodeDll.tail.before.value).toBe(2);
      expect(threeNodeDll.tail.before.before.value).toBe(3);
      expect(threeNodeDll.tail.before.before.before).toBeNull();
      expect(threeNodeDll.size()).toBe(3);
    });

    // length <= 1 일 때, DLL 은 변하지 않는다.
    it('should remain same WHEN length <= 1', () => {
      oneNodeDll.reverse();
      expect(oneNodeDll.head.value).toBe(1);
      expect(oneNodeDll.head.next).toBeNull();
      expect(oneNodeDll.tail.value).toBe(1);
      expect(oneNodeDll.tail.before).toBeNull();
      expect(oneNodeDll.size()).toBe(1);
    });
  });
});
