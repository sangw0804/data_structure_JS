import { Queue } from '../index.js';
import { createQueueElement } from '../components/index.js';

const queue = new Queue();
const main = document.getElementById('main');

// enqueue
const enqueueButton = document.getElementById('enqueue_button');
const enqueueInput = document.getElementById('enqueue_value');
enqueueButton.onclick = () => {
  queue.enqueue(enqueueInput.value);
  main.innerHTML = null;
  main.appendChild(createQueueElement(queue));
};

// dequeue
const dequeueButton = document.getElementById('dequeue_button');
dequeueButton.onclick = () => {
  queue.dequeue();
  main.innerHTML = null;
  main.appendChild(createQueueElement(queue));
};
