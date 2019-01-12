import { createNodeElement } from '../node.js';

const createDequeueElement = dequeue => {
  const result = document.createElement('div');
  result.setAttribute('id', 'dequeue');
  result.setAttribute(
    'style',
    'border-top: 1px solid black; border-bottom: 1px solid black; display: flex; align-items: center'
  );

  if (!dequeue.size()) return result;

  let current = dequeue.head;
  while (current) {
    result.appendChild(createNodeElement(current.value));
    current = current.next;
  }

  return result;
};

export { createDequeueElement };
