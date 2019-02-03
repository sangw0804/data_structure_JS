import { Heap } from '../index.js';
import { createHeapElement } from '../components/index.js';
import { delayAndApply, buttonDisableHOC } from './helpers/index.js';

const heapName = { true: 'Max Heap', false: 'Min Heap' };
let isMaxHeap = true;
let heap = new Heap();
const main = document.getElementById('main');
const name = document.getElementById('name');

// insert
const insertButton = document.getElementById('insert_button');
const insertInput = document.getElementById('insert_value');
insertButton.onclick = buttonDisableHOC(async () => {
  try {
    if (!insertInput.value.length) throw new Error('채워지지 않은 필드가 있습니다.');
    heap.insert(+insertInput.value, true);

    const snapshots = heap.returnSnapshots();
    for (let i = 0; i < snapshots.length; i += 1) {
      await delayAndApply(main, createHeapElement(snapshots[i]), 1000);
    }
    await delayAndApply(main, createHeapElement(heap), 1000);
  } catch (e) {
    alert(e);
  }
}, 'INSERT');

// pop
const popButton = document.getElementById('pop_button');
popButton.onclick = buttonDisableHOC(async () => {
  try {
    heap.pop(true);

    const snapshots = heap.returnSnapshots();
    for (let i = 0; i < snapshots.length; i += 1) {
      await delayAndApply(main, createHeapElement(snapshots[i]), 1000);
    }
    await delayAndApply(main, createHeapElement(heap), 1000);
  } catch (e) {
    alert(e);
  }
}, 'POP');

// minHeap / maxHeap change
const changeButton = document.getElementById('change_button');
changeButton.onclick = () => {
  isMaxHeap = !isMaxHeap;
  heap = new Heap(isMaxHeap);
  main.innerHTML = null;
  name.innerText = heapName[isMaxHeap];
};
