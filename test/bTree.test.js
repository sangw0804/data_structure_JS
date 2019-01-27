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
  oneFloorBTree.root.values = ['a', 'b', 'c', 'e', 'f'];
  oneFloorBTree.root.children = ['1', '2', '3', '4', '5', '6'];
  oneFloorBTree.root.valueLength = 5;

  twoFloorBTree = new BTree(5);
  twoFloorBTree.root = new BTreeNode(twoFloorBTree.limit);
  twoFloorBTree.root.values = ['c', 'j'];
  twoFloorBTree.root.valueLength = 2;
  const firstChild = new BTreeNode(twoFloorBTree.limit);
  firstChild.values = ['a', 'b'];
  firstChild.children = ['1', '2', '3'];
  firstChild.valueLength = 2;
  const secondChild = new BTreeNode(twoFloorBTree.limit);
  secondChild.values = ['d', 'e', 'f', 'g', 'h'];
  secondChild.children = ['1', '2', '3', '4', '5', '6'];
  secondChild.valueLength = 5;
  const thirdChild = new BTreeNode(twoFloorBTree.limit);
  thirdChild.values = ['k', 'l'];
  thirdChild.children = ['1', '2', '3'];
  thirdChild.valueLength = 2;
  twoFloorBTree.root.children = [firstChild, secondChild, thirdChild];
});

describe('B-Tree Test', () => {
  describe('Initialize B-Tree', () => {
    it('should create empty B-Tree', () => {
      expect(emptyBTree.root).toBeNull();
    });
  });

  describe('_split Test', () => {
    it('should split root node and return new node reference', () => {
      oneFloorBTree.root = oneFloorBTree._split(null, 'd');
      expect(oneFloorBTree.root.values).toEqual(['c']);
      expect(oneFloorBTree.root.size()).toBe(1);
      expect(oneFloorBTree.root.children[0].values).toEqual(['a', 'b']);
      expect(oneFloorBTree.root.children[0].children).toEqual(['1', '2', '3']);
      expect(oneFloorBTree.root.children[1].values).toEqual(['e', 'f']);
      expect(oneFloorBTree.root.children[1].children).toEqual(['4', '5', '6']);
    });

    it('should split normal node and return reference of parent node', () => {
      twoFloorBTree.root = twoFloorBTree._split(twoFloorBTree.root, 'i');
      expect(twoFloorBTree.root.values).toEqual(['c', 'f', 'j']);
      expect(twoFloorBTree.root.size()).toBe(3);
      expect(twoFloorBTree.root.children[0].values).toEqual(['a', 'b']);
      expect(twoFloorBTree.root.children[0].children).toEqual(['1', '2', '3']);
      expect(twoFloorBTree.root.children[1].values).toEqual(['d', 'e']);
      expect(twoFloorBTree.root.children[1].children).toEqual(['1', '2', '3']);
      expect(twoFloorBTree.root.children[2].values).toEqual(['g', 'h']);
      expect(twoFloorBTree.root.children[2].children).toEqual(['4', '5', '6']);
      expect(twoFloorBTree.root.children[3].values).toEqual(['k', 'l']);
      expect(twoFloorBTree.root.children[3].children).toEqual(['1', '2', '3']);
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

  // describe('Find Test', () => {
  //   it('should return false if given value not in Tree', () => {
  //     expect(fulledBTree.find(100)).toBe(false);
  //   });

  //   it('should return containing node if given value is found in Tree', () => {
  //     expect(fulledBTree.find(5).findValue(5)).toBeGreaterThan(-1);
  //   });
  // });
});
