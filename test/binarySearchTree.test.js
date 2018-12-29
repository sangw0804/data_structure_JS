import expect from 'expect';
import { BinarySearchTree } from '../lib';
import { INVALID_VALUE, EXIST_VALUE } from '../lib/error';

let emptyBst;
let multiNodeBst;

beforeEach(() => {
  emptyBst = new BinarySearchTree();
  multiNodeBst = new BinarySearchTree();
  multiNodeBst
    .insert(10)
    .insert(8)
    .insert(21)
    .insert(3);
});

describe('Binary Search Tree Test', () => {
  // BST 초기화 테스트
  describe('Initialize BST', () => {
    it('should make emtpy BST', () => {
      expect(emptyBst.root).toBeNull();
      expect(emptyBst.size()).toBe(0);
    });
  });

  // insert 메소드 테스트
  describe('BST - insert', () => {
    // 빈 BST에 insert 하면 root 가 된다.
    it('should make new node and set it as root WHEN length === 0', () => {
      emptyBst.insert(1);
      expect(emptyBst.root.value).toBe(1);
      expect(emptyBst.root.leftChild).toBeNull();
      expect(emptyBst.root.rightChild).toBeNull();
      expect(emptyBst.size()).toBe(1);
    });

    // node가 있는 BST에 insert 하면 알맞은 위치에 삽입된다.
    it('should make new node and insert it at correct position WHEN length >= 1', () => {
      multiNodeBst.insert(17);
      expect(multiNodeBst.size()).toBe(5);
      expect(multiNodeBst.root.rightChild.leftChild.value).toBe(17);
    });

    // value가 number 타입이 아닐 경우 에러를 발생시킨다.
    it('should throw error given value is not number', () => {
      expect(() => emptyBst.insert('1')).toThrow(INVALID_VALUE);
      expect(emptyBst.root).toBeNull();
      expect(emptyBst.size()).toBe(0);
    });

    // value 가 BST 안에 이미 존재하는 경우 에러를 발생시킨다.
    it('should throw error given value already exist in BST', () => {
      expect(() => multiNodeBst.insert(3)).toThrow(EXIST_VALUE);
      expect(multiNodeBst.root.value).toBe(10);
      expect(multiNodeBst.size()).toBe(4);
    });
  });

  // find 메소드 테스트
  describe('BST - find', () => {
    // 주어진 value 를 가진 노드를 찾아서 리턴한다.
    it('should find and return node with given value', () => {
      const foundNode = multiNodeBst.find(3);
      expect(foundNode.value).toBe(3);
    });

    // 주어진 value 를 가진 노드가 없으면 false를 리턴한다.
    it("should return false if given value doesn't exist", () => {
      const foundNode = multiNodeBst.find(100);
      expect(foundNode).toBe(false);
    });
  });
});
