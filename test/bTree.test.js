import expect from 'expect';
import { BTree } from '../lib/bTree';
import { BTreeNode } from '../lib/node';

let emptyBTree;
let oneFloorBTree;
let twoFloorBTree;
let testBTree;

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
  testBTree = new BTree(3);
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
  fourthChild.values = ['o'];
  fourthChild.valueLength = 1;
  fourthChild.children = ['9', '10'];

  testBTree.root.children = [firstChild, secondChild, thirdChild, fourthChild];
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
    it('should borrowKey from right sibling node', () => {
      expect(testBTree._borrowKey(testBTree.root, 1)).toBe(true);
      expect(testBTree.root.size()).toBe(3);
      expect(testBTree.root.values).toEqual(['d', 'i', 'm']);
      expect(testBTree.root.children[0].size()).toBe(2);
      expect(testBTree.root.children[0].values).toEqual(['a', 'b']);
      expect(testBTree.root.children[1].size()).toBe(2);
      expect(testBTree.root.children[1].values).toEqual(['f', 'h']);
      expect(testBTree.root.children[2].size()).toBe(1);
      expect(testBTree.root.children[2].values).toEqual(['j']);
      expect(testBTree.root.children[3].size()).toBe(1);
      expect(testBTree.root.children[3].values).toEqual(['o']);
    });

    it("should burrow key from left sibling node if right sibling doesn't exist", () => {
      expect(testBTree._borrowKey(testBTree.root, 3)).toBe(true);
      expect(testBTree.root.size()).toBe(3);
      expect(testBTree.root.values).toEqual(['d', 'h', 'j']);
      expect(testBTree.root.children[0].size()).toBe(2);
      expect(testBTree.root.children[0].values).toEqual(['a', 'b']);
      expect(testBTree.root.children[1].size()).toBe(1);
      expect(testBTree.root.children[1].values).toEqual(['f']);
      expect(testBTree.root.children[2].size()).toBe(1);
      expect(testBTree.root.children[2].values).toEqual(['i']);
      expect(testBTree.root.children[3].size()).toBe(2);
      expect(testBTree.root.children[3].values).toEqual(['m', 'o']);
    });
  });

  describe('_bindNode Test', () => {
    it('should bind two node into one node', () => {
      testBTree._bindNode(testBTree.root, 2);
      expect(testBTree.root.size()).toBe(2);
      expect(testBTree.root.values).toEqual(['d', 'h']);
      expect(testBTree.root.children[0].size()).toBe(2);
      expect(testBTree.root.children[0].values).toEqual(['a', 'b']);
      expect(testBTree.root.children[1].size()).toBe(1);
      expect(testBTree.root.children[1].values).toEqual(['f']);
      expect(testBTree.root.children[2].size()).toBe(4);
      expect(testBTree.root.children[2].values).toEqual(['i', 'j', 'm', 'o']);
    });
  });

  describe('_swap Test', () => {
    it('should swap del value and next value', () => {
      BTree._swap(testBTree.root, 1);
      expect(testBTree.root.size()).toBe(3);
      expect(testBTree.root.values).toEqual(['d', 'i', 'm']);
      expect(testBTree.root.children[0].size()).toBe(2);
      expect(testBTree.root.children[0].values).toEqual(['a', 'b']);
      expect(testBTree.root.children[1].size()).toBe(1);
      expect(testBTree.root.children[1].values).toEqual(['f']);
      expect(testBTree.root.children[2].size()).toBe(2);
      expect(testBTree.root.children[2].values).toEqual(['i', 'j']);
      expect(testBTree.root.children[3].size()).toBe(1);
      expect(testBTree.root.children[3].values).toEqual(['o']);
    });
  });

  describe('Remove Test', () => {
    it('should just remove value WHEN del node has enough number of values', () => {
      twoFloorBTree.remove('h');
      expect(twoFloorBTree.root.size()).toBe(2);
      expect(twoFloorBTree.root.values).toEqual(['c', 'f']);
      expect(twoFloorBTree.root.children[0].values).toEqual(['a', 'b']);
      expect(twoFloorBTree.root.children[0].size()).toBe(2);
      expect(twoFloorBTree.root.children[1].values).toEqual(['d', 'e']);
      expect(twoFloorBTree.root.children[1].size()).toBe(2);
      expect(twoFloorBTree.root.children[2].values).toEqual(['g', 'i']);
      expect(twoFloorBTree.root.children[2].size()).toBe(2);
    });

    it('should remove value WHEN del node has not enough number of values - borrow key', () => {
      twoFloorBTree.remove('e');
      expect(twoFloorBTree.root.size()).toBe(2);
      expect(twoFloorBTree.root.values).toEqual(['c', 'g']);
      expect(twoFloorBTree.root.children[0].values).toEqual(['a', 'b']);
      expect(twoFloorBTree.root.children[0].size()).toBe(2);
      expect(twoFloorBTree.root.children[1].values).toEqual(['d', 'f']);
      expect(twoFloorBTree.root.children[1].size()).toBe(2);
      expect(twoFloorBTree.root.children[2].values).toEqual(['h', 'i']);
      expect(twoFloorBTree.root.children[2].size()).toBe(2);
    });

    it('should remove value WHEN del node has not enough number of values - bindNode', () => {
      twoFloorBTree.remove('a');
      expect(twoFloorBTree.root.size()).toBe(1);
      expect(twoFloorBTree.root.values).toEqual(['f']);
      expect(twoFloorBTree.root.children[0].values).toEqual(['b', 'c', 'd', 'e']);
      expect(twoFloorBTree.root.children[0].size()).toBe(4);
      expect(twoFloorBTree.root.children[1].values).toEqual(['g', 'h', 'i']);
      expect(twoFloorBTree.root.children[1].size()).toBe(3);
    });

    it('should swap AND remove value WHEN del node has enough number of values', () => {
      twoFloorBTree.remove('f');
      expect(twoFloorBTree.root.size()).toBe(2);
      expect(twoFloorBTree.root.values).toEqual(['c', 'g']);
      expect(twoFloorBTree.root.children[0].values).toEqual(['a', 'b']);
      expect(twoFloorBTree.root.children[0].size()).toBe(2);
      expect(twoFloorBTree.root.children[1].values).toEqual(['d', 'e']);
      expect(twoFloorBTree.root.children[1].size()).toBe(2);
      expect(twoFloorBTree.root.children[2].values).toEqual(['h', 'i']);
      expect(twoFloorBTree.root.children[2].size()).toBe(2);
    });

    it('should swap AND remove value WHEN del node has not enough number of values', () => {
      twoFloorBTree.remove('c');
      expect(twoFloorBTree.root.size()).toBe(2);
      expect(twoFloorBTree.root.values).toEqual(['d', 'g']);
      expect(twoFloorBTree.root.children[0].values).toEqual(['a', 'b']);
      expect(twoFloorBTree.root.children[0].size()).toBe(2);
      expect(twoFloorBTree.root.children[1].values).toEqual(['e', 'f']);
      expect(twoFloorBTree.root.children[1].size()).toBe(2);
      expect(twoFloorBTree.root.children[2].values).toEqual(['h', 'i']);
      expect(twoFloorBTree.root.children[2].size()).toBe(2);
    });
  });
});
