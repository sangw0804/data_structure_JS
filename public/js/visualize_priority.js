import { PriorityQueue } from '../index.js';
import { createPriorityQueueElement } from '../components/index.js';

const priorityQueue = new PriorityQueue();
const main = document.getElementById('main');

// enqueue
const enqueueButton = document.getElementById('enqueue_button');
const enqueueValueInput = document.getElementById('enqueue_value_value');
const enqueuePriorityInput = document.getElementById('enqueue_priority_value');
enqueueButton.onclick = () => {
  priorityQueue.enqueue(enqueueValueInput.value, +enqueuePriorityInput.value);
  main.innerHTML = null;
  main.appendChild(createPriorityQueueElement(priorityQueue));
};

// dequeue
const dequeueButton = document.getElementById('dequeue_button');
dequeueButton.onclick = () => {
  priorityQueue.dequeue();
  main.innerHTML = null;
  main.appendChild(createPriorityQueueElement(priorityQueue));
};
