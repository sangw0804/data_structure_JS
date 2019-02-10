import { createPriorityNodeElement, createEmptyPriorityNodeElement } from '../node.js';

const createPriorityQueueElement = priorityQueue => {
  const result = document.createElement('div');
  result.setAttribute('id', 'priorityQueue');
  result.setAttribute('style', 'display:flex; flex-direction: column; align-items: center');

  let end = 0;
  let power = 1;
  let row = document.createElement('div');

  priorityQueue.nodes.forEach((node, index) => {
    if (index === end) {
      row.appendChild(createPriorityNodeElement(node));
      result.appendChild(row);
      row = document.createElement('div');
      power *= 2;
      end += power;
    } else {
      row.appendChild(createPriorityNodeElement(node));
    }
  });

  if (priorityQueue.size() - 1 > end - power) {
    for (let i = priorityQueue.size(); i <= end; i += 1) {
      row.appendChild(createEmptyPriorityNodeElement());
    }
    result.appendChild(row);
  }

  return result;
};

export { createPriorityQueueElement };
