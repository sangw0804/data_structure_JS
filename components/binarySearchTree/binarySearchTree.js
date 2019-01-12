import { createNodeElement, createEmptyNodeElement } from '../node.js';

const recursive = n => {
  if (!n) return createEmptyNodeElement();

  const currentElement = document.createElement('div');
  currentElement.setAttribute('style', 'display: inline-flex; flex-direction: column; align-items: center');
  currentElement.appendChild(createNodeElement(n.value));

  const childrenElement = document.createElement('div');
  childrenElement.setAttribute('style', 'display: inline-flex;');
  childrenElement.appendChild(recursive(n.leftChild));
  childrenElement.appendChild(recursive(n.rightChild));
  currentElement.appendChild(childrenElement);

  return currentElement;
};

const createBinarySearchTreeElement = bst => {
  const result = document.createElement('div');
  result.setAttribute('id', 'bst');
  result.setAttribute('style', 'display:flex; flex-direction: column; align-items: center');

  const current = bst.root;

  result.appendChild(recursive(current));

  return result;
};

export { createBinarySearchTreeElement };
