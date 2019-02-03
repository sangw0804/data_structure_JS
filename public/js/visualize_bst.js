import { BinarySearchTree } from '../index.js';
import { createBinarySearchTreeElement } from '../components/index.js';

import { delayAndApply, buttonDisableHOC } from './helpers/index.js';

const bst = new BinarySearchTree();
const main = document.getElementById('main');

// insert
const insertButton = document.getElementById('insert_button');
const insertInput = document.getElementById('insert_value');
insertButton.onclick = buttonDisableHOC(async event => {
  try {
    if (!insertInput.value.length) throw new Error('채워지지 않은 필드가 있습니다.');

    bst.insert(+insertInput.value, true);

    const snapshots = bst.returnSnapshots();
    for (let i = 0; i < snapshots.length; i += 1) {
      await delayAndApply(main, createBinarySearchTreeElement(snapshots[i]), 1000);
    }

    await delayAndApply(main, createBinarySearchTreeElement(bst), 1000);
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

    bst.remove(+removeInput.value, true);

    const snapshots = bst.returnSnapshots();
    for (let i = 0; i < snapshots.length; i += 1) {
      await delayAndApply(main, createBinarySearchTreeElement(snapshots[i]), 1000);
    }

    await delayAndApply(main, createBinarySearchTreeElement(bst), 1000);
  } catch (e) {
    alert(e);
  }
}, 'REMOVE');
