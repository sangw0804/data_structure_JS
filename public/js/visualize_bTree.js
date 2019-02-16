import { BTree } from '../index.js';
import { createBTreeElement } from '../components/index.js';

import { delayAndApply, buttonDisableHOC, drawLineBTree } from './helpers/index.js';

const bTree = new BTree(3);
const main = document.getElementById('main');
let lines = [];

// insert
const insertButton = document.getElementById('insert_button');
const insertInput = document.getElementById('insert_value');
insertButton.onclick = buttonDisableHOC(async event => {
  try {
    if (!insertInput.value.length) throw new Error('채워지지 않은 필드가 있습니다.');

    const insertGenerator = bTree.insertGen(+insertInput.value);
    for (let snapshot of insertGenerator) {
      await delayAndApply(main, createBTreeElement(snapshot), 100);
      lines.forEach(l => l.remove());
      lines = drawLineBTree(main.firstChild);
    }

    await delayAndApply(main, createBTreeElement(bTree), 100);
    lines.forEach(l => l.remove());
    lines = drawLineBTree(main.firstChild);
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
    const removeGenerator = bTree.removeGen(+removeInput.value);

    for (let snapshot of removeGenerator) {
      await delayAndApply(main, createBTreeElement(snapshot), 1000);
      lines.forEach(l => l.remove());
      lines = drawLineBTree(main.firstChild);
    }

    await delayAndApply(main, createBTreeElement(bTree), 1000);
    lines.forEach(l => l.remove());
    lines = drawLineBTree(main.firstChild);
  } catch (e) {
    console.log(e);
    alert(e);
  }
}, 'REMOVE');
