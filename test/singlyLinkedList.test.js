import expect from 'expect';
import { SinglyLinkedList } from '../index';

// 테스트 용 SLL
let emptySll;
let oneNodeSll;
let twoNodeSll;

// 매 테스트마다 사용할 빈 SLL과 노드가 있는 SLL 만들기.
beforeEach(() => {
  emptySll = new SinglyLinkedList();
  oneNodeSll = new SinglyLinkedList();
  oneNodeSll.push(1);
  twoNodeSll = new SinglyLinkedList();
  twoNodeSll.push(1).push(2);
});

describe('LinkedList test', () => {
  // 초기화 테스트
  describe('Initialize SLL', () => {
    it('should make empty sll!', () => {
      expect(emptySll).toHaveProperty('head', null);
      expect(emptySll).toHaveProperty('tail', null);
      expect(emptySll).toHaveProperty('length', 0);
    });
  });

  // push 메소드 테스트
  describe('SLL - push', () => {
    // SLL에 노드가 없을 경우 하나의 노드를 만들고 head, tail로 지정한다.
    it('should create new node, and set it as head && tail WHEN length === 0', () => {
      emptySll.push(1);
      expect(emptySll.head.value).toBe(1);
      expect(emptySll.tail.value).toBe(1);
      expect(emptySll.head.next).toBeNull();
      expect(emptySll.tail.next).toBeNull();
      expect(emptySll.length).toBe(1);
    });

    // SLL에 노드가 있을 경우, 하나의 노드를 만들어 기존의 tail 노드가 새 노드를 가리키게 하고, 새 노드가 tail 이 된다.
    it('should set new node as new tail, and old tail should point new node WHEN length >= 1', () => {
      oneNodeSll.push(2);
      expect(oneNodeSll.head.value).toBe(1);
      expect(oneNodeSll.head.next.value).toBe(2);
      expect(oneNodeSll.tail.value).toBe(2);
      expect(oneNodeSll.tail.next).toBeNull();
      expect(oneNodeSll.length).toBe(2);
    });
  });

  // pop 메소드 테스트
  describe('SLL - pop', () => {
    // SLL 에 노드가 없을 경우 undefined 를 리턴한다.
    it('should return undefined WHEN length === 0', () => {
      const poppedVal = emptySll.pop();
      expect(poppedVal).toBeUndefined();
      expect(emptySll.length).toBe(0);
      expect(emptySll.head).toBeNull();
      expect(emptySll.tail).toBeNull();
    });

    // SLL 에 노드가 1개 있을 경우 그 노드의 값를 리턴한다. SLL은 empty 상태가 된다.
    it('should return value of node and SLL become empty WHEN length === 1', () => {
      const poppedVal = oneNodeSll.pop();
      expect(poppedVal).toBe(1);
      expect(emptySll.length).toBe(0);
      expect(emptySll.head).toBeNull();
      expect(emptySll.tail).toBeNull();
    });

    // SLL 에 노드가 2개 있을 경우 tail 노드의 값을 리턴하고, tail이 head 노드를 가리킨다.
    it('should return value of tail node and tail point head node WHEN length === 2', () => {
      const poppedVal = twoNodeSll.pop();
      expect(poppedVal).toBe(2);
      expect(twoNodeSll.length).toBe(1);
      expect(twoNodeSll.head.value).toBe(1);
      expect(twoNodeSll.head.next).toBeNull();
      expect(twoNodeSll.tail.value).toBe(1);
      expect(twoNodeSll.tail.next).toBeNull();
    });
  });
});
