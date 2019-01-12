import { createNodeElement } from '../node.js';
import { createArrow } from '../pointer.js';

const createSinglyLinkedListElement = sll => {
  const result = document.createElement('div');
  result.setAttribute('id', 'sll');

  if (!sll.size()) return result;

  let current = sll.head;
  while (current) {
    result.appendChild(createNodeElement(current.value));
    result.appendChild(createArrow('right'));
    current = current.next;
  }
  result.appendChild(document.createTextNode('NULL'));

  return result;
};

export { createSinglyLinkedListElement };
