import expect from 'expect';
import { BTree } from '../lib/bTree';
import { BTreeNode } from '../lib/node';

let emptyBTree;
let oneFloorBTree;
let twoFloorBTree;

beforeEach(() => {
  emptyBTree = new BTree(3);

  oneFloorBTree = new BTree(5);
  oneFloorBTree.root = new BTreeNode(oneFloorBTree.limit);
  oneFloorBTree
    .insert('a')
    .insert('b')
    .insert('c')
    .insert('d');

  twoFloorBTree = new BTree(5);
  twoFloorBTree
    .insert('a')
    .insert('b')
    .insert('c')
    .insert('d')
    .insert('e')
    .insert('f')
    .insert('g')
    .insert('h')
    .insert('i');
});

describe('B-Tree Test', () => {
  describe('Initialize B-Tree', () => {
    it('should create empty B-Tree', () => {
      expect(emptyBTree.root).toBeNull();
    });
  });

  describe('Insert Test', () => {
    it('should insert value in bTree', () => {
      emptyBTree.insert('a');
      expect(emptyBTree.root.values).toEqual(['a']);
      expect(emptyBTree.root.size()).toBe(1);
      emptyBTree.insert('c');
      expect(emptyBTree.root.values).toEqual(['a', 'c']);
      expect(emptyBTree.root.size()).toBe(2);
      emptyBTree.insert('b');
      expect(emptyBTree.root.values).toEqual(['a', 'b', 'c']);
      expect(emptyBTree.root.size()).toBe(3);

      emptyBTree.insert('d');
      expect(emptyBTree.root.values).toEqual(['b']);
      expect(emptyBTree.root.valueLength).toBe(1);
      expect(emptyBTree.root.children[0].values).toEqual(['a']);
      expect(emptyBTree.root.children[0].size()).toBe(1);
      expect(emptyBTree.root.children[1].values).toEqual(['c', 'd']);
      expect(emptyBTree.root.children[1].size()).toBe(2);

      emptyBTree.insert('e');
      expect(emptyBTree.root.values).toEqual(['b']);
      expect(emptyBTree.root.valueLength).toBe(1);
      expect(emptyBTree.root.children[0].values).toEqual(['a']);
      expect(emptyBTree.root.children[0].size()).toBe(1);
      expect(emptyBTree.root.children[1].values).toEqual(['c', 'd', 'e']);
      expect(emptyBTree.root.children[1].size()).toBe(3);

      emptyBTree.insert('f');
      expect(emptyBTree.root.values).toEqual(['b', 'd']);
      expect(emptyBTree.root.valueLength).toBe(2);
      expect(emptyBTree.root.children[0].values).toEqual(['a']);
      expect(emptyBTree.root.children[0].size()).toBe(1);
      expect(emptyBTree.root.children[1].values).toEqual(['c']);
      expect(emptyBTree.root.children[1].size()).toBe(1);
      expect(emptyBTree.root.children[2].values).toEqual(['e', 'f']);
      expect(emptyBTree.root.children[2].size()).toBe(2);

      emptyBTree.insert('g');
      expect(emptyBTree.root.values).toEqual(['b', 'd']);
      expect(emptyBTree.root.valueLength).toBe(2);
      expect(emptyBTree.root.children[0].values).toEqual(['a']);
      expect(emptyBTree.root.children[0].size()).toBe(1);
      expect(emptyBTree.root.children[1].values).toEqual(['c']);
      expect(emptyBTree.root.children[1].size()).toBe(1);
      expect(emptyBTree.root.children[2].values).toEqual(['e', 'f', 'g']);
      expect(emptyBTree.root.children[2].size()).toBe(3);

      emptyBTree.insert('i');
      expect(emptyBTree.root.values).toEqual(['b', 'd', 'f']);
      expect(emptyBTree.root.valueLength).toBe(3);
      expect(emptyBTree.root.children[0].values).toEqual(['a']);
      expect(emptyBTree.root.children[0].size()).toBe(1);
      expect(emptyBTree.root.children[1].values).toEqual(['c']);
      expect(emptyBTree.root.children[1].size()).toBe(1);
      expect(emptyBTree.root.children[2].values).toEqual(['e']);
      expect(emptyBTree.root.children[2].size()).toBe(1);
      expect(emptyBTree.root.children[3].values).toEqual(['g', 'i']);
      expect(emptyBTree.root.children[3].size()).toBe(2);

      emptyBTree.insert('j');
      expect(emptyBTree.root.values).toEqual(['d']);
      expect(emptyBTree.root.valueLength).toBe(1);
      expect(emptyBTree.root.children[0].values).toEqual(['b']);
      expect(emptyBTree.root.children[0].size()).toBe(1);
      expect(emptyBTree.root.children[1].values).toEqual(['f']);
      expect(emptyBTree.root.children[1].size()).toBe(1);
      expect(emptyBTree.root.children[0].children[0].values).toEqual(['a']);
      expect(emptyBTree.root.children[0].children[0].size()).toBe(1);
      expect(emptyBTree.root.children[0].children[1].values).toEqual(['c']);
      expect(emptyBTree.root.children[0].children[1].size()).toBe(1);
      expect(emptyBTree.root.children[1].children[0].values).toEqual(['e']);
      expect(emptyBTree.root.children[1].children[0].size()).toBe(1);
      expect(emptyBTree.root.children[1].children[1].values).toEqual(['g', 'i', 'j']);
      expect(emptyBTree.root.children[1].children[1].size()).toBe(3);

      emptyBTree.insert('h');
      expect(emptyBTree.root.values).toEqual(['d']);
      expect(emptyBTree.root.valueLength).toBe(1);
      expect(emptyBTree.root.children[0].values).toEqual(['b']);
      expect(emptyBTree.root.children[0].size()).toBe(1);
      expect(emptyBTree.root.children[1].values).toEqual(['f', 'i']);
      expect(emptyBTree.root.children[1].size()).toBe(2);
      expect(emptyBTree.root.children[0].children[0].values).toEqual(['a']);
      expect(emptyBTree.root.children[0].children[0].size()).toBe(1);
      expect(emptyBTree.root.children[0].children[1].values).toEqual(['c']);
      expect(emptyBTree.root.children[0].children[1].size()).toBe(1);
      expect(emptyBTree.root.children[1].children[0].values).toEqual(['e']);
      expect(emptyBTree.root.children[1].children[0].size()).toBe(1);
      expect(emptyBTree.root.children[1].children[1].values).toEqual(['g', 'h']);
      expect(emptyBTree.root.children[1].children[1].size()).toBe(2);
      expect(emptyBTree.root.children[1].children[2].values).toEqual(['j']);
      expect(emptyBTree.root.children[1].children[2].size()).toBe(1);
    });
  });

  describe('Find Test', () => {
    it('should return false if given value not in Tree', () => {
      expect(oneFloorBTree.find('z')).toBe(false);
      expect(twoFloorBTree.find('z')).toBe(false);
    });

    it('should return containing node if given value is found in Tree', () => {
      expect(oneFloorBTree.find('c').findValue('c')).toBeGreaterThan(-1);
      expect(twoFloorBTree.find('h').findValue('h')).toBeGreaterThan(-1);
    });
  });

  describe('_borrowKey Test', () => {
    it('should borrowKey from left sibling node', () => {
      const testBTree = new BTree(3);
      testBTree.root = new BTreeNode(3);
      testBTree.root.values = ['d', 'h', 'm'];
      testBTree.root.valueLength = 3;

      const firstChild = new BTreeNode(3);
      firstChild.values = ['a', 'b'];
      firstChild.valueLength = 2;
      firstChild.children = ['1', '2', '3'];

      const secondChild = new BTreeNode(3);
      secondChild.values = ['f'];
      secondChild.valueLength = 1;
      secondChild.children = ['4', '5'];

      const thirdChild = new BTreeNode(3);
      thirdChild.values = ['i', 'j'];
      thirdChild.valueLength = 2;
      thirdChild.children = ['6', '7', '8'];

      const fourthChild = new BTreeNode(3);
      fourthChild.values = ['o', 'p'];
      fourthChild.valueLength = 2;
      fourthChild.children = ['9', '10', '11'];

      testBTree.root.children = [firstChild, secondChild, thirdChild, fourthChild];

      expect(testBTree._borrowKey(testBTree.root, 1)).toBe(true);
      expect(testBTree.root.size()).toBe(3);
      expect(testBTree.root.values).toEqual(['d', 'i', 'm']);
      expect(testBTree.root.children[0].size()).toBe(2);
      expect(testBTree.root.children[0].values).toEqual(['a', 'b']);
      expect(testBTree.root.children[1].size()).toBe(2);
      expect(testBTree.root.children[1].values).toEqual(['f', 'h']);
      expect(testBTree.root.children[2].size()).toBe(1);
      expect(testBTree.root.children[2].values).toEqual(['j']);
      expect(testBTree.root.children[3].size()).toBe(2);
      expect(testBTree.root.children[3].values).toEqual(['o', 'p']);
    });
  });

  // describe('Remove Test', () => {
  //   it('should remove value from bTree', () => {});
  // });
});
