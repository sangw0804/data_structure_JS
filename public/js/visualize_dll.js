import { DoublyLinkedList } from '../index.js';
import { createDoublyLinkedListElement } from '../components/index.js';

import { delayAndApply, buttonDisableHOC } from './helpers/index.js';

const dll = new DoublyLinkedList();
const main = document.getElementById('main');

// push
const pushButton = document.getElementById('push_button');
const pushInput = document.getElementById('push_value');
pushButton.onclick = buttonDisableHOC(async () => {
  try {
    if (!pushInput.value.length) throw new Error('채워지지 않은 필드가 있습니다.');

    dll.push(pushInput.value, true);

    const snapshots = dll.returnSnapshots();
    for (let i = 0; i < snapshots.length; i += 1) {
      await delayAndApply(main, createDoublyLinkedListElement(snapshots[i]), 1000);
    }
    await delayAndApply(main, createDoublyLinkedListElement(dll), 1000);
  } catch (e) {
    alert(e);
  }
}, 'PUSH');

// pop
const popButton = document.getElementById('pop_button');
popButton.onclick = buttonDisableHOC(async () => {
  try {
    dll.pop(true);

    const snapshots = dll.returnSnapshots();
    for (let i = 0; i < snapshots.length; i += 1) {
      await delayAndApply(main, createDoublyLinkedListElement(snapshots[i]), 1000);
    }
    await delayAndApply(main, createDoublyLinkedListElement(dll), 1000);
  } catch (e) {
    alert(e);
  }
}, 'POP');

// unshift
const unshiftButton = document.getElementById('unshift_button');
const unshiftInput = document.getElementById('unshift_value');
unshiftButton.onclick = buttonDisableHOC(async () => {
  try {
    if (!unshiftInput.value.length) throw new Error('채워지지 않은 필드가 있습니다.');

    dll.unshift(unshiftInput.value, true);

    const snapshots = dll.returnSnapshots();
    for (let i = 0; i < snapshots.length; i += 1) {
      await delayAndApply(main, createDoublyLinkedListElement(snapshots[i]), 1000);
    }
    await delayAndApply(main, createDoublyLinkedListElement(dll), 1000);
  } catch (e) {
    alert(e);
  }
}, 'UNSHIFT');

// shift
const shiftButton = document.getElementById('shift_button');
shiftButton.onclick = buttonDisableHOC(async () => {
  try {
    dll.shift(true);

    const snapshots = dll.returnSnapshots();
    for (let i = 0; i < snapshots.length; i += 1) {
      await delayAndApply(main, createDoublyLinkedListElement(snapshots[i]), 1000);
    }
    await delayAndApply(main, createDoublyLinkedListElement(dll), 1000);
  } catch (e) {
    alert(e);
  }
}, 'SHIFT');

// insert
const insertButton = document.getElementById('insert_button');
const insertIndexInput = document.getElementById('insert_index_value');
const insertValueInput = document.getElementById('insert_value_value');
insertButton.onclick = buttonDisableHOC(async () => {
  try {
    if (!insertIndexInput.value.length || !insertValueInput) throw new Error('채워지지 않은 필드가 있습니다.');

    dll.insert(+insertIndexInput.value, insertValueInput.value, true);

    const snapshots = dll.returnSnapshots();
    for (let i = 0; i < snapshots.length; i += 1) {
      await delayAndApply(main, createDoublyLinkedListElement(snapshots[i]), 1000);
    }
    await delayAndApply(main, createDoublyLinkedListElement(dll), 1000);
  } catch (e) {
    alert(e);
  }
}, 'INSERT');

// remove
const removeButton = document.getElementById('remove_button');
const removeIndexInput = document.getElementById('remove_index_value');
removeButton.onclick = buttonDisableHOC(async () => {
  try {
    if (!removeIndexInput.value.length) throw new Error('채워지지 않은 필드가 있습니다.');

    dll.remove(+removeIndexInput.value, true);

    const snapshots = dll.returnSnapshots();
    for (let i = 0; i < snapshots.length; i += 1) {
      await delayAndApply(main, createDoublyLinkedListElement(snapshots[i]), 1000);
    }
    await delayAndApply(main, createDoublyLinkedListElement(dll), 1000);
  } catch (e) {
    alert(e);
  }
}, 'REMOVE');

// reverse
const reverseButton = document.getElementById('reverse_button');
reverseButton.onclick = async () => {
  try {
    dll.reverse();
    main.innerHTML = null;
    main.appendChild(createDoublyLinkedListElement(dll));
  } catch (e) {
    alert(e);
  }
};
