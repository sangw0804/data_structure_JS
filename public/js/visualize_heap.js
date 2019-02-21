import { Heap } from '../index.js';
import { createHeapElement } from '../components/index.js';
import { delayAndApply, buttonDisableHOC, drawLineHeap } from './helpers/index.js';

const heapName = { true: 'Max Heap', false: 'Min Heap' };
let isMaxHeap = true;
let heap = new Heap();
const main = document.getElementById('main');
const name = document.getElementById('name');
let lines = [];

// insert
const insertButton = document.getElementById('insert_button');
const insertInput = document.getElementById('insert_value');
insertButton.onclick = buttonDisableHOC(async () => {
  try {
    if (!insertInput.value.length) throw new Error('채워지지 않은 필드가 있습니다.');
    const iter = heap.insertGen(+insertInput.value);

    for (let snapshot of iter) {
      await delayAndApply(main, createHeapElement(snapshot), 1000);
      lines.forEach(l => l.remove());
      lines = drawLineHeap(main);
    }
    await delayAndApply(main, createHeapElement(heap), 1000);
    lines.forEach(l => l.remove());
    lines = drawLineHeap(main);
  } catch (e) {
    alert(e);
  }
}, 'INSERT');

// pop
const popButton = document.getElementById('pop_button');
popButton.onclick = buttonDisableHOC(async () => {
  try {
    const iter = heap.popGen();

    for (let snapshot of iter) {
      await delayAndApply(main, createHeapElement(snapshot), 1000);
      lines.forEach(l => l.remove());
      lines = drawLineHeap(main);
    }
    await delayAndApply(main, createHeapElement(heap), 1000);
    lines.forEach(l => l.remove());
    lines = drawLineHeap(main);
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
