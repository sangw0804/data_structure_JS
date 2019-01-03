import { BinarySearchTree } from '../index.js';
import { createBinarySearchTreeElement } from '../components/index.js';

let bst = new BinarySearchTree();
const main = document.getElementById('main');

// insert
const insertButton = document.getElementById('insert_button');
const insertInput = document.getElementById('insert_value');
insertButton.onclick = () => {
  try {
    if (!insertInput.value.length) throw new Error('채워지지 않은 필드가 있습니다.');
    bst.insert(+insertInput.value);
    main.innerHTML = null;
    main.appendChild(createBinarySearchTreeElement(bst));
  } catch (e) {
    alert(e);
  }
};

// remove
const removeButton = document.getElementById('remove_button');
const removeInput = document.getElementById('remove_value');
removeButton.onclick = () => {
  try {
    if (!removeInput.value.length) throw new Error('채워지지 않은 필드가 있습니다.');
    bst.remove(+removeInput.value);
    main.innerHTML = null;
    main.appendChild(createBinarySearchTreeElement(bst));
  } catch (e) {
    alert(e);
  }
};
