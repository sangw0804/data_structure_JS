import { createNodeElement, createEmptyNodeElement } from '../node.js';

const createHeapElement = heap => {
  const result = document.createElement('div');
  result.setAttribute('id', 'heap');
  result.setAttribute('style', 'display:flex; flex-direction: column; align-items: center');

  let end = 0;
  let power = 1;
  let row = document.createElement('div');
  heap.values.forEach((value, index) => {
    if (index === end) {
      row.appendChild(createNodeElement(value));
      result.appendChild(row);
      row = document.createElement('div');
      power *= 2;
      end += power;
    } else {
      row.appendChild(createNodeElement(value));
    }
  });

  if (heap.size() - 1 > end - power) {
    for (let i = heap.size(); i <= end; i += 1) {
      row.appendChild(createEmptyNodeElement());
    }
    result.appendChild(row);
  }

  return result;
};

export { createHeapElement };
