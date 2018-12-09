import expect from 'expect';
import { SinglyLinkedList } from '../index';

describe('LinkedList test', () => {
  it('should make empty sll!', () => {
    const sll = new SinglyLinkedList();
    expect(sll).toHaveProperty('head', null);
    expect(sll).toHaveProperty('tail', null);
    expect(sll).toHaveProperty('length', 0);
  });
});
