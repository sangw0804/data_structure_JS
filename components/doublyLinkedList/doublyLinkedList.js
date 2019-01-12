import { createNodeElement } from '../node.js';
import { createArrow } from '../pointer.js';

const createDoublyLinkedListElement = dll => {
  const result = document.createElement('div');
  result.setAttribute('id', 'dll');
  if (!dll.size()) return result;

  let current = dll.head;

  result.appendChild(document.createTextNode('NULL'));
  while (current) {
    result.appendChild(createArrow('left'));
    result.appendChild(createNodeElement(current.value));
    result.appendChild(createArrow('right'));
    current = current.next;
  }
  result.appendChild(document.createTextNode('NULL'));

  return result;
};

export { createDoublyLinkedListElement };
