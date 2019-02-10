import { createNodeElement, createEmptyNodeElement } from '../node.js';
import { createArrow } from '../pointer.js';

const createDoublyLinkedListElement = dll => {
  const result = document.createElement('div');
  result.setAttribute('id', 'dll');
  if (!dll.size()) return result;

  let current = dll.head;

  result.appendChild(createEmptyNodeElement());
  while (current) {
    const node = createNodeElement(current);
    node.style.margin = '15px';
    result.appendChild(node);

    current = current.next;
  }
  result.appendChild(createEmptyNodeElement());

  return result;
};

export { createDoublyLinkedListElement };
