import { SinglyLinkedList } from '../../index.js';
import { createSinglyLinkedListElement } from '../../components/index.js';

import { delayAndApply, buttonDisableHOC } from './helpers/index.js';

const sll = new SinglyLinkedList();
const main = document.getElementById('main');

// push
const pushButton = document.getElementById('push_button');
const pushInput = document.getElementById('push_value');
pushButton.onclick = buttonDisableHOC(async event => {
  try {
    if (!pushInput.value.length) throw new Error('채워지지 않은 필드가 있습니다.');

    sll.push(pushInput.value, true);

    const snapshots = sll.returnSnapshots();
    for (let i = 0; i < snapshots.length; i += 1) {
      await delayAndApply(main, createSinglyLinkedListElement(snapshots[i]), 1000);
    }
    await delayAndApply(main, createSinglyLinkedListElement(sll), 1000);
  } catch (e) {
    alert(e);
  }
}, 'PUSH');

// pop
const popButton = document.getElementById('pop_button');
popButton.onclick = buttonDisableHOC(async event => {
  try {
    sll.pop(true);

    const snapshots = sll.returnSnapshots();
    for (let i = 0; i < snapshots.length; i += 1) {
      await delayAndApply(main, createSinglyLinkedListElement(snapshots[i]), 1000);
    }
    await delayAndApply(main, createSinglyLinkedListElement(sll), 1000);
  } catch (e) {
    alert(e);
  }
}, 'POP');

// unshift
const unshiftButton = document.getElementById('unshift_button');
const unshiftInput = document.getElementById('unshift_value');
unshiftButton.onclick = buttonDisableHOC(async event => {
  try {
    if (!unshiftInput.value.length) throw new Error('채워지지 않은 필드가 있습니다!');

    sll.unshift(unshiftInput.value, true);

    const snapshots = sll.returnSnapshots();
    for (let i = 0; i < snapshots.length; i += 1) {
      await delayAndApply(main, createSinglyLinkedListElement(snapshots[i]), 1000);
    }
    await delayAndApply(main, createSinglyLinkedListElement(sll), 1000);
  } catch (e) {
    alert(e);
  }
}, 'INSHIFT');

// shift
const shiftButton = document.getElementById('shift_button');
shiftButton.onclick = buttonDisableHOC(async event => {
  try {
    sll.shift(true);

    const snapshots = sll.returnSnapshots();
    for (let i = 0; i < snapshots.length; i += 1) {
      await delayAndApply(main, createSinglyLinkedListElement(snapshots[i]), 1000);
    }
    await delayAndApply(main, createSinglyLinkedListElement(sll), 1000);
  } catch (e) {
    alert(e);
  }
}, 'SHIFT');

// insert
const insertButton = document.getElementById('insert_button');
const insertIndexInput = document.getElementById('insert_index_value');
const insertValueInput = document.getElementById('insert_value_value');
insertButton.onclick = buttonDisableHOC(async event => {
  try {
    if (!insertIndexInput.value.length || !insertValueInput.value.length)
      throw new Error('채워지지 않은 필드가 있습니다.');

    sll.insert(+insertIndexInput.value, insertValueInput.value, true);

    const snapshots = sll.returnSnapshots();
    for (let i = 0; i < snapshots.length; i += 1) {
      await delayAndApply(main, createSinglyLinkedListElement(snapshots[i]), 1000);
    }
    await delayAndApply(main, createSinglyLinkedListElement(sll), 1000);
  } catch (e) {
    alert(e);
  }
}, 'INSERT');

// remove
const removeButton = document.getElementById('remove_button');
const removeIndexInput = document.getElementById('remove_index_value');
removeButton.onclick = buttonDisableHOC(async event => {
  try {
    if (!removeIndexInput.value.length) throw new Error('채워지지 않은 필드가 있습니다.');

    sll.remove(+removeIndexInput.value, true);

    const snapshots = sll.returnSnapshots();
    for (let i = 0; i < snapshots.length; i += 1) {
      await delayAndApply(main, createSinglyLinkedListElement(snapshots[i]), 1000);
    }
    await delayAndApply(main, createSinglyLinkedListElement(sll), 1000);
  } catch (e) {
    alert(e);
  }
}, 'REMOVE');

// reverse
const reverseButton = document.getElementById('reverse_button');
reverseButton.onclick = async event => {
  try {
    sll.reverse();

    // const snapshots = sll.returnSnapshots();
    // for (let i = 0; i < snapshots.length; i += 1) {
    //   await delayAndApply(main, createSinglyLinkedListElement(snapshots[i]), 1000);
    // }
    // await delayAndApply(main, createSinglyLinkedListElement(sll), 1000);
  } catch (e) {
    alert(e);
  }
};
