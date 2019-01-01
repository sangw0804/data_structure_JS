import { BinarySearchTree } from '../index.js';
import { createBinarySearchTreeElement } from '../components/index.js';

let bst = new BinarySearchTree();
const main = document.getElementById('main');

// insert
const insertButton = document.getElementById('insert_button');
const insertInput = document.getElementById('insert_value');
insertButton.onclick = () => {
  bst.insert(+insertInput.value);
  main.innerHTML = null;
  main.appendChild(createBinarySearchTreeElement(bst));
};

// remove
const removeButton = document.getElementById('remove_button');
const removeInput = document.getElementById('remove_value');
removeButton.onclick = () => {
  bst.remove(+removeInput.value);
  main.innerHTML = null;
  main.appendChild(createBinarySearchTreeElement(bst));
};
