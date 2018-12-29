import expect from 'expect';
import { BinarySearchTree } from '../lib';

let emptyBst;

beforeEach(() => {
  emptyBst = new BinarySearchTree();
});

describe('Binary Search Tree Test', () => {
  describe('Initialize BST', () => {
    it('should make emtpy BST', () => {
      expect(emptyBst.root).toBeNull();
      expect(emptyBst.length).toBe(0);
    });
  });
});
