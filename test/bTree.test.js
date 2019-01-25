import expect from 'expect';
import { BTree } from '../lib/bTree';

let emptyBTree;

beforeEach(() => {
  emptyBTree = new BTree();
});

describe('B-Tree Test', () => {
  describe('Initialize B-Tree', () => {
    it('should create empty B-Tree', () => {
      expect(emptyBTree.root).toBeNull();
    });
  });
});
