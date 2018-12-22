import expect from 'expect';
import { SinglyLinkedList } from '../index';

// 테스트 용 SLL
let emptySll;
let oneNodeSll;
let twoNodeSll;
let threeNodeSll;

// 에러 문자열 상수
const INDEX_OUT_OF_ORDER = 'index is out of lange!';

// 매 테스트마다 사용할 빈 SLL과 노드가 있는 SLL 만들기.
beforeEach(() => {
  emptySll = new SinglyLinkedList();
  oneNodeSll = new SinglyLinkedList();
  oneNodeSll.push(1);
  twoNodeSll = new SinglyLinkedList();
  twoNodeSll.push(1).push(2);
  threeNodeSll = new SinglyLinkedList();
  threeNodeSll
    .push(1)
    .push(2)
    .push(3);
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
      expect(emptySll.size()).toBe(1);
    });

    // SLL에 노드가 있을 경우, 하나의 노드를 만들어 기존의 tail 노드가 새 노드를 가리키게 하고, 새 노드가 tail 이 된다.
    it('should set new node as new tail, and old tail should point new node WHEN length >= 1', () => {
      oneNodeSll.push(2);
      expect(oneNodeSll.head.value).toBe(1);
      expect(oneNodeSll.head.next.value).toBe(2);
      expect(oneNodeSll.tail.value).toBe(2);
      expect(oneNodeSll.tail.next).toBeNull();
      expect(oneNodeSll.size()).toBe(2);
    });
  });

  // pop 메소드 테스트
  describe('SLL - pop', () => {
    // SLL 에 노드가 없을 경우 undefined 를 리턴한다.
    it('should return undefined WHEN length === 0', () => {
      const poppedVal = emptySll.pop();
      expect(poppedVal).toBeUndefined();
      expect(emptySll.size()).toBe(0);
      expect(emptySll.head).toBeNull();
      expect(emptySll.tail).toBeNull();
    });

    // SLL 에 노드가 1개 있을 경우 그 노드의 값를 리턴한다. SLL은 empty 상태가 된다.
    it('should return value of node and SLL become empty WHEN length === 1', () => {
      const poppedVal = oneNodeSll.pop();
      expect(poppedVal).toBe(1);
      expect(emptySll.size()).toBe(0);
      expect(emptySll.head).toBeNull();
      expect(emptySll.tail).toBeNull();
    });

    // SLL 에 노드가 2개 있을 경우 tail 노드의 값을 리턴하고, tail이 head 노드를 가리킨다.
    it('should return value of tail node and tail point head node WHEN length === 2', () => {
      const poppedVal = twoNodeSll.pop();
      expect(poppedVal).toBe(2);
      expect(twoNodeSll.size()).toBe(1);
      expect(twoNodeSll.head.value).toBe(1);
      expect(twoNodeSll.head.next).toBeNull();
      expect(twoNodeSll.tail.value).toBe(1);
      expect(twoNodeSll.tail.next).toBeNull();
    });
  });

  // shift 메소드 테스트
  describe('SLL - shift', () => {
    // SLL 에 노드가 없을 경우 undefined 를 리턴한다.
    it('should return undefined WHEN length === 0', () => {
      const shiftedVal = emptySll.shift();
      expect(shiftedVal).toBeUndefined();
      expect(emptySll.size()).toBe(0);
      expect(emptySll.head).toBeNull();
      expect(emptySll.tail).toBeNull();
    });

    // SLL 에 노드가 1개 있을 경우 그 노드의 값을 리턴한다. SLL은 empty 상태가 된다.
    it('should return value of node and SLL become empty WHEN length === 1', () => {
      const shiftedVal = oneNodeSll.shift();
      expect(shiftedVal).toBe(1);
      expect(emptySll.size()).toBe(0);
      expect(emptySll.head).toBeNull();
      expect(emptySll.tail).toBeNull();
    });

    // SLL 에 노드가 2개 있을 경우 head 노드의 값을 리턴하고, head 가 tail 노드를 가리킨다.
    it('should return value of head node and head point tail node WHEN length === 2', () => {
      const shiftedVal = twoNodeSll.shift();
      expect(shiftedVal).toBe(1);
      expect(twoNodeSll.size()).toBe(1);
      expect(twoNodeSll.head.value).toBe(2);
      expect(twoNodeSll.head.next).toBeNull();
      expect(twoNodeSll.tail.value).toBe(2);
      expect(twoNodeSll.tail.next).toBeNull();
    });
  });

  // unshift 메소드 테스트
  describe('SLL - unshift', () => {
    // SLL에 노드가 없을 경우 하나의 노드를 만들고 head, tail로 지정한다.
    it('should create new node, and set it as head && tail WHEN length === 0', () => {
      emptySll.unshift(1);
      expect(emptySll.head.value).toBe(1);
      expect(emptySll.tail.value).toBe(1);
      expect(emptySll.head.next).toBeNull();
      expect(emptySll.tail.next).toBeNull();
      expect(emptySll.size()).toBe(1);
    });

    // SLL에 노드가 있을 경우, 하나의 노드를 만들어 기존의 노드를 가리키게 하고, 새 노드가 head 가 된다.
    it('should set new node as new head, and new node should point old head WHEN length >= 1', () => {
      oneNodeSll.unshift(2);
      expect(oneNodeSll.head.value).toBe(2);
      expect(oneNodeSll.head.next.value).toBe(1);
      expect(oneNodeSll.tail.value).toBe(1);
      expect(oneNodeSll.tail.next).toBeNull();
      expect(oneNodeSll.size()).toBe(2);
    });
  });

  // insert 메소드 테스트
  describe('SLL - insert', () => {
    // 해당 index 위치에 노드를 생성해서 삽입한다.
    it('should insert node in currect index', () => {
      twoNodeSll.insert(1, 7);
      expect(twoNodeSll.head.next.value).toBe(7);
      expect(twoNodeSll.head.next.next.next).toBeNull();
      expect(twoNodeSll.size()).toBe(3);
    });

    // index 위치가 유효하지 않으면 에러를 발생시킨다.
    it('should throw error with invalid index', () => {
      expect(() => twoNodeSll.insert(3, 3)).toThrow(INDEX_OUT_OF_ORDER);
      expect(twoNodeSll.size()).toBe(2);
    });
  });

  // remove 메소드 테스트
  describe('SLL - remove', () => {
    // 해당 index 위치에 있는 노드를 제거하고 값을 리턴한다.
    it('should remove node in correct index and return value', () => {
      const removedValue = threeNodeSll.remove(0);
      expect(removedValue).toBe(1);
      expect(threeNodeSll.head.value).toBe(2);
      expect(threeNodeSll.head.next.value).toBe(3);
      expect(threeNodeSll.size()).toBe(2);
    });

    // index 위치가 유효하지 않으면 에러를 발생시킨다.
    it('should throw error with invalid index', () => {
      expect(() => threeNodeSll.remove(3)).toThrow(INDEX_OUT_OF_ORDER);
      expect(threeNodeSll.size()).toBe(3);
    });
  });

  // reverse 메소드 테스트
  describe('SLL - reverse', () => {
    // length > 1 일 때, SLL을 뒤집는다
    it('should reverse SLL WHEN length > 1', () => {
      threeNodeSll.reverse();
      expect(threeNodeSll.head.value).toBe(3);
      expect(threeNodeSll.head.next.value).toBe(2);
      expect(threeNodeSll.head.next.next.value).toBe(1);
      expect(threeNodeSll.head.next.next.next).toBeNull();
      expect(threeNodeSll.tail.value).toBe(1);
      expect(threeNodeSll.tail.next).toBeNull();
      expect(threeNodeSll.size()).toBe(3);
    });

    // length <= 일 때, SLL은 변화 없다.
    it('should not change SLL WHEN length <= 1', () => {
      oneNodeSll.reverse();
      expect(oneNodeSll.head.value).toBe(1);
      expect(oneNodeSll.tail.value).toBe(1);
      expect(oneNodeSll.tail.next).toBeNull();
      expect(oneNodeSll.size()).toBe(1);
    });
  });
});
