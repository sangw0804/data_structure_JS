import { DoublyLinkedList } from '../index.js';
import { createDoublyLinkedListElement } from '../components/index.js';

import { delayAndApply, buttonDisableHOC, drawLineLL } from './helpers/index.js';

const dll = new DoublyLinkedList();
const main = document.getElementById('main');
let lines = [];

// push
const pushButton = document.getElementById('push_button');
const pushInput = document.getElementById('push_value');
pushButton.onclick = buttonDisableHOC(async () => {
  try {
    if (!pushInput.value.length) throw new Error('채워지지 않은 필드가 있습니다.');

    const iter = dll.pushGen(pushInput.value);

    for (let snapshot of iter) {
      await delayAndApply(main, createDoublyLinkedListElement(snapshot), 1000);
      lines.forEach(l => l.remove());
      lines = drawLineLL(main, true);
    }
    await delayAndApply(main, createDoublyLinkedListElement(dll), 1000);
    lines.forEach(l => l.remove());
    lines = drawLineLL(main, true);
  } catch (e) {
    alert(e);
  }
}, 'PUSH');

// pop
const popButton = document.getElementById('pop_button');
popButton.onclick = buttonDisableHOC(async () => {
  try {
    const iter = dll.popGen();

    for (let snapshot of iter) {
      await delayAndApply(main, createDoublyLinkedListElement(snapshot), 1000);
      lines.forEach(l => l.remove());
      lines = drawLineLL(main, true);
    }
    await delayAndApply(main, createDoublyLinkedListElement(dll), 1000);
    lines.forEach(l => l.remove());
    lines = drawLineLL(main, true);
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

    const iter = dll.unshiftGen(unshiftInput.value);

    for (let snapshot of iter) {
      await delayAndApply(main, createDoublyLinkedListElement(snapshot), 1000);
      lines.forEach(l => l.remove());
      lines = drawLineLL(main, true);
    }
    await delayAndApply(main, createDoublyLinkedListElement(dll), 1000);
    lines.forEach(l => l.remove());
    lines = drawLineLL(main, true);
  } catch (e) {
    alert(e);
  }
}, 'UNSHIFT');

// shift
const shiftButton = document.getElementById('shift_button');
shiftButton.onclick = buttonDisableHOC(async () => {
  try {
    const iter = dll.shiftGen();

    for (let snapshot of iter) {
      await delayAndApply(main, createDoublyLinkedListElement(snapshot), 1000);
      lines.forEach(l => l.remove());
      lines = drawLineLL(main, true);
    }
    await delayAndApply(main, createDoublyLinkedListElement(dll), 1000);
    lines.forEach(l => l.remove());
    lines = drawLineLL(main, true);
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

    const iter = dll.insertGen(+insertIndexInput.value, insertValueInput.value);

    for (let snapshot of iter) {
      await delayAndApply(main, createDoublyLinkedListElement(snapshot), 1000);
      lines.forEach(l => l.remove());
      lines = drawLineLL(main, true);
    }
    await delayAndApply(main, createDoublyLinkedListElement(dll), 1000);
    lines.forEach(l => l.remove());
    lines = drawLineLL(main, true);
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

    const iter = dll.removeGen(+removeIndexInput.value);

    for (let snapshot of iter) {
      await delayAndApply(main, createDoublyLinkedListElement(snapshot), 1000);
      lines.forEach(l => l.remove());
      lines = drawLineLL(main, true);
    }
    await delayAndApply(main, createDoublyLinkedListElement(dll), 1000);
    lines.forEach(l => l.remove());
    lines = drawLineLL(main, true);
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
    lines.forEach(l => l.remove());
    lines = drawLineLL(main, true);
  } catch (e) {
    alert(e);
  }
};
