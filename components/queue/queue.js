import { createNodeElement } from '../node.js';

const createQueueElement = queue => {
  const result = document.createElement('div');
  result.setAttribute('id', 'queue');
  result.setAttribute(
    'style',
    'border-top: 1px solid black; border-bottom: 1px solid black; display: flex; align-items: center'
  );

  if (!queue.size()) return result;

  let current = queue.head;
  while (current) {
    result.appendChild(createNodeElement(current));
    current = current.next;
  }

  return result;
};

export { createQueueElement };
