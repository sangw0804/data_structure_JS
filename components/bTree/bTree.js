import { createBTreeNodeElement } from '../node.js';

const recursive = n => {
  if (!n) return;

  const currentElement = document.createElement('div');
  currentElement.setAttribute('style', 'display: inline-flex; flex-direction: column; align-items: center');
  currentElement.appendChild(createBTreeNodeElement(n));

  const childrenElement = document.createElement('div');
  childrenElement.setAttribute('style', 'display: inline-flex;');
  for (let i = 0; i < n.valueLength + 1; i += 1) {
    if (n.children[i]) childrenElement.appendChild(recursive(n.children[i]));
  }
  currentElement.appendChild(childrenElement);

  return currentElement;
};

const createBTreeElement = bTree => {
  const result = document.createElement('div');
  result.setAttribute('id', 'bTree');
  result.setAttribute('style', 'display:flex; flex-direction: column; align-items: center');

  const current = bTree.root;

  result.appendChild(recursive(current));

  return result;
};

export { createBTreeElement };
