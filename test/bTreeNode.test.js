import expect from 'expect';
import { BTreeNode } from '../lib/node';

let emptyBTreeNode;
let twoBTreeNode;

beforeEach(() => {
  emptyBTreeNode = new BTreeNode(5);
  twoBTreeNode = new BTreeNode(5);
  twoBTreeNode.addValue(1, '0', '2');
  twoBTreeNode.addValue(3, '2', '4');
});

describe('B-TreeNode Test', () => {
  describe('Initialize B-TreeNode', () => {
    it('should create empty node', () => {
      expect(emptyBTreeNode.size()).toBe(0);
    });
  });

  describe('addValue Test', () => {
    it('should add value to btreeNode', () => {
      emptyBTreeNode.addValue(3, '3lchild', '3rchild');
      expect(emptyBTreeNode.size()).toBe(1);
      emptyBTreeNode.addValue(1, '1lchild', '1rchild');
      expect(emptyBTreeNode.size()).toBe(2);
      expect(emptyBTreeNode.children).toEqual(['1lchild', '1rchild', '3rchild']);
    });
  });

  describe('removeValue Test', () => {
    it('should remove value from btreeNode', () => {
      twoBTreeNode.removeValue(0);
      expect(twoBTreeNode.size()).toBe(1);
      expect(twoBTreeNode.children).toEqual(['2', '4']);
    });
  });

  describe('findValue Test', () => {
    it('should find value from btreeNode', () => {
      expect(twoBTreeNode.findValue(3)).toBe(1);
      expect(twoBTreeNode.findValue(4)).toBe(-1);
    });
  });
});
