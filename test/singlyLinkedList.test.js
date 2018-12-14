import expect from 'expect';
import { SinglyLinkedList } from '../index';

let emptySll, filledSll;

// 매 테스트마다 사용할 빈 SLL과 노드가 있는 SLL 만들기
beforeEach(() => {
  emptySll = new SinglyLinkedList();
  filledSll = new SinglyLinkedList();
  filledSll.push(1);
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
    // SLL에 노드가 없을 경우 하나의 노드를 만들고 head, tail로 지정한다
    it('should create new node, and set it as head && tail when length === 0', () => {
      emptySll.push(1);
      expect(emptySll.head.value).toBe(1);
      expect(emptySll.tail.value).toBe(1);
      expect(emptySll.head.next).toBeNull();
      expect(emptySll.tail.next).toBeNull();
      expect(emptySll.length).toBe(1);
    });

    // SLL에 노드가 있을 경우, 하나의 노드를 만들어 기존의 tail 노드가 새 노드를 가리키게 하고, 새 노드가 tail 이 된다.
    it('should set new node as new tail, and old tail should point new node when length >= 1', () => {
      filledSll.push(2);
      expect(filledSll.head.value).toBe(1);
      expect(filledSll.head.next.value).toBe(2);
      expect(filledSll.tail.value).toBe(2);
      expect(filledSll.tail.next).toBeNull();
      expect(filledSll.length).toBe(2);
    });
  });
});
