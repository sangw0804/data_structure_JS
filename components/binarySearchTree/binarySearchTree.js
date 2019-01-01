import { BinarySearchTree, Queue } from '../../lib/index.js';
import { createNodeElement } from '../node.js';

const recursive = n => {
  console.log(n);
  if (!n) return createNodeElement('empty');
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

  // console.log(bst);

  const current = bst.root;

  result.appendChild(recursive(current));

  // const nodes = new Queue();
  // nodes.enqueue(bst.root);
  // const valueArray = [];

  // while (nodes.size()) {
  //   const temp = nodes.dequeue();
  //   if (temp) {
  //     valueArray.push(temp.value);
  //     nodes.enqueue(temp.leftChild);
  //     nodes.enqueue(temp.rightChild);
  //   } else {
  //     valueArray.push('empty');
  //   }
  // }
  // console.log(valueArray);

  // let end = 0;
  // let power = 1;
  // let row = document.createElement('div');
  // valueArray.forEach((value, index) => {
  //   if (index === end) {
  //     row.appendChild(createNodeElement(value));
  //     result.appendChild(row);
  //     row = document.createElement('div');
  //     power *= 2;
  //     end += power;
  //   } else {
  //     row.appendChild(createNodeElement(value));
  //   }
  // });

  // if (valueArray.length < end) {
  //   for (let i = valueArray.length; i <= end; i += 1) {
  //     row.appendChild(createNodeElement('empty'));
  //   }
  //   result.appendChild(row);
  // }

  return result;
};

export { createBinarySearchTreeElement };
