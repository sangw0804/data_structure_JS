import { PriorityQueue } from '../index.js';
import { createPriorityQueueElement } from '../components/index.js';
import { delayAndApply, buttonDisableHOC, drawLineHeap } from './helpers/index.js';

const priorityQueue = new PriorityQueue();
const main = document.getElementById('main');
let lines = [];

// enqueue
const enqueueButton = document.getElementById('enqueue_button');
const enqueueValueInput = document.getElementById('enqueue_value_value');
const enqueuePriorityInput = document.getElementById('enqueue_priority_value');
enqueueButton.onclick = buttonDisableHOC(async () => {
  try {
    if (!enqueueValueInput.value.length || !enqueuePriorityInput.value.length)
      throw new Error('채워지지 않은 필드가 있습니다.');

    const iter = priorityQueue.enqueueGen(enqueueValueInput.value, +enqueuePriorityInput.value);

    for (let snapshot of iter) {
      await delayAndApply(main, createPriorityQueueElement(snapshot), 1000);
      lines.forEach(l => l.remove());
      lines = drawLineHeap(main);
    }
    await delayAndApply(main, createPriorityQueueElement(priorityQueue), 1000);
    lines.forEach(l => l.remove());
    lines = drawLineHeap(main);
  } catch (e) {
    alert(e);
  }
}, 'ENQUEUE');

// dequeue
const dequeueButton = document.getElementById('dequeue_button');
dequeueButton.onclick = buttonDisableHOC(async () => {
  try {
    const iter = priorityQueue.dequeueGen();

    for (let snapshot of iter) {
      await delayAndApply(main, createPriorityQueueElement(snapshot), 1000);
      lines.forEach(l => l.remove());
      lines = drawLineHeap(main);
    }
    await delayAndApply(main, createPriorityQueueElement(priorityQueue), 1000);
    lines.forEach(l => l.remove());
    lines = drawLineHeap(main);
  } catch (e) {
    alert(e);
  }
}, 'DEQUEUE');
