import { PriorityQueue } from '../index.js';
import { createPriorityQueueElement } from '../components/index.js';

const priorityQueue = new PriorityQueue();
const main = document.getElementById('main');

// enqueue
const enqueueButton = document.getElementById('enqueue_button');
const enqueueValueInput = document.getElementById('enqueue_value_value');
const enqueuePriorityInput = document.getElementById('enqueue_priority_value');
enqueueButton.onclick = () => {
  try {
    if (!enqueueValueInput.value.length || !enqueuePriorityInput.value.length)
      throw new Error('채워지지 않은 필드가 있습니다.');
    priorityQueue.enqueue(enqueueValueInput.value, +enqueuePriorityInput.value);
    main.innerHTML = null;
    main.appendChild(createPriorityQueueElement(priorityQueue));
  } catch (e) {
    alert(e);
  }
};

// dequeue
const dequeueButton = document.getElementById('dequeue_button');
dequeueButton.onclick = () => {
  priorityQueue.dequeue();
  main.innerHTML = null;
  main.appendChild(createPriorityQueueElement(priorityQueue));
};
