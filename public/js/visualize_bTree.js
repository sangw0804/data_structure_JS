import { BTree } from '../index.js';
import { createBTreeElement } from '../components/index.js';

import { delayAndApply, buttonDisableHOC, drawLineBST } from './helpers/index.js';

const bTree = new BTree(3);
const main = document.getElementById('main');
// let lines = [];

// insert
const insertButton = document.getElementById('insert_button');
const insertInput = document.getElementById('insert_value');
insertButton.onclick = buttonDisableHOC(async event => {
  try {
    if (!insertInput.value.length) throw new Error('채워지지 않은 필드가 있습니다.');

    bTree.insert(+insertInput.value);

    // const snapshots = bst.returnSnapshots();
    // for (let i = 0; i < snapshots.length; i += 1) {
    //   await delayAndApply(main, createBTreeElement(snapshots[i]), 1000);
    //   lines.forEach(l => l.remove());
    //   lines = drawLineBST(main.firstChild);
    // }

    await delayAndApply(main, createBTreeElement(bTree), 1000);
    // lines.forEach(l => l.remove());
    // lines = drawLineBST(main.firstChild);
  } catch (e) {
    console.log(e);
    alert(e);
  }
}, 'INSERT');

// remove
const removeButton = document.getElementById('remove_button');
const removeInput = document.getElementById('remove_value');
removeButton.onclick = buttonDisableHOC(async event => {
  try {
    if (!removeInput.value.length) throw new Error('채워지지 않은 필드가 있습니다.');

    bTree.remove(+removeInput.value);

    // const snapshots = bst.returnSnapshots();
    // for (let i = 0; i < snapshots.length; i += 1) {
    //   await delayAndApply(main, createBTreeElement(snapshots[i]), 1000);
    //   lines.forEach(l => l.remove());
    //   lines = drawLineBST(main.firstChild);
    // }

    await delayAndApply(main, createBTreeElement(bTree), 1000);
    // lines.forEach(l => l.remove());
    // lines = drawLineBST(main.firstChild);
  } catch (e) {
    alert(e);
  }
}, 'REMOVE');
