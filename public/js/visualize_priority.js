import { PriorityQueue } from '../index.js';
import { createPriorityQueueElement } from '../components/index.js';
import { delayAndApply, buttonDisableHOC } from './helpers/index.js';

const priorityQueue = new PriorityQueue();
const main = document.getElementById('main');

// enqueue
const enqueueButton = document.getElementById('enqueue_button');
const enqueueValueInput = document.getElementById('enqueue_value_value');
const enqueuePriorityInput = document.getElementById('enqueue_priority_value');
enqueueButton.onclick = buttonDisableHOC(async () => {
  try {
    if (!enqueueValueInput.value.length || !enqueuePriorityInput.value.length)
      throw new Error('채워지지 않은 필드가 있습니다.');

    priorityQueue.enqueue(enqueueValueInput.value, +enqueuePriorityInput.value, true);

    const snapshots = priorityQueue.returnSnapshots();
    for (let i = 0; i < snapshots.length; i += 1) {
      await delayAndApply(main, createPriorityQueueElement(snapshots[i]), 1000);
    }
    await delayAndApply(main, createPriorityQueueElement(priorityQueue), 1000);
  } catch (e) {
    alert(e);
  }
}, 'ENQUEUE');

// dequeue
const dequeueButton = document.getElementById('dequeue_button');
dequeueButton.onclick = buttonDisableHOC(async () => {
  try {
    priorityQueue.dequeue(true);

    const snapshots = priorityQueue.returnSnapshots();
    for (let i = 0; i < snapshots.length; i += 1) {
      await delayAndApply(main, createPriorityQueueElement(snapshots[i]), 1000);
    }
    await delayAndApply(main, createPriorityQueueElement(priorityQueue), 1000);
  } catch (e) {
    alert(e);
  }
}, 'DEQUEUE');
