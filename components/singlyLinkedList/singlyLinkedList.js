import { createNodeElement, createEmptyNodeElement } from '../node.js';
import { createArrow } from '../pointer.js';

const createSinglyLinkedListElement = sll => {
  const result = document.createElement('div');
  result.setAttribute('id', 'sll');
  if (!sll.size()) return result;

  let current = sll.head;
  while (current) {
    const node = createNodeElement(current.value, current.colored);
    node.style.margin = '15px';
    result.appendChild(node);
    current = current.next;
  }
  result.appendChild(createEmptyNodeElement());

  return result;
};

export { createSinglyLinkedListElement };
