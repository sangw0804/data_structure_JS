import { BinarySearchTree } from '../index.js';
import { createBinarySearchTreeElement } from '../components/index.js';

import { delayAndApply, buttonDisableHOC, drawLineBST } from './helpers/index.js';

const bst = new BinarySearchTree();
const main = document.getElementById('main');
let lines = [];

// insert
const insertButton = document.getElementById('insert_button');
const insertInput = document.getElementById('insert_value');
insertButton.onclick = buttonDisableHOC(async event => {
  try {
    if (!insertInput.value.length) throw new Error('채워지지 않은 필드가 있습니다.');

    const iter = bst.insertGen(+insertInput.value);

    for (let snapshot of iter) {
      await delayAndApply(main, createBinarySearchTreeElement(snapshot), 1000);
      lines.forEach(l => l.remove());
      lines = drawLineBST(main.firstChild);
    }

    await delayAndApply(main, createBinarySearchTreeElement(bst), 1000);
    lines.forEach(l => l.remove());
    lines = drawLineBST(main.firstChild);
  } catch (e) {
    alert(e);
  }
}, 'INSERT');

// remove
const removeButton = document.getElementById('remove_button');
const removeInput = document.getElementById('remove_value');
removeButton.onclick = buttonDisableHOC(async event => {
  try {
    if (!removeInput.value.length) throw new Error('채워지지 않은 필드가 있습니다.');

    const iter = bst.removeGen(+removeInput.value);

    for (let snapshot of iter) {
      await delayAndApply(main, createBinarySearchTreeElement(snapshot), 1000);
      lines.forEach(l => l.remove());
      lines = drawLineBST(main.firstChild);
    }

    await delayAndApply(main, createBinarySearchTreeElement(bst), 1000);
    lines.forEach(l => l.remove());
    lines = drawLineBST(main.firstChild);
  } catch (e) {
    alert(e);
  }
}, 'REMOVE');
